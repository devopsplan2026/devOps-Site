# DevOps Academy — End-to-End Deployment Guide

> A complete step-by-step guide to containerize, deploy, monitor, and GitOps-automate the DevOps Academy Flask application on AWS EKS.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Prerequisites](#2-prerequisites)
3. [Project Structure](#3-project-structure)
4. [Step 1 — Flask App Setup](#4-step-1--flask-app-setup)
5. [Step 2 — Dockerize the App](#5-step-2--dockerize-the-app)
6. [Step 3 — Provision EKS with Terraform](#6-step-3--provision-eks-with-terraform)
7. [Step 4 — CI/CD with Jenkins](#7-step-4--cicd-with-jenkins)
8. [Step 5 — Deploy to Kubernetes](#8-step-5--deploy-to-kubernetes)
9. [Step 6 — Monitoring with Prometheus & Grafana](#9-step-6--monitoring-with-prometheus--grafana)
10. [Step 7 — GitOps with ArgoCD](#10-step-7--gitops-with-argocd)
11. [Full Pipeline Flow](#11-full-pipeline-flow)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. Architecture Overview

```
Developer
   │
   │  git push
   ▼
GitHub (devopsplan2026/devOps-Site)
   │
   ├──▶ Jenkins (CI)
   │       │  docker build & push
   │       ▼
   │    DockerHub (devopsplan2026/devops-site:<version>)
   │       │
   │       │  sed image tag → git push manifest
   │       ▼
   │    GitHub (k8s-manifest.yaml updated)
   │
   └──▶ ArgoCD (CD) watches Git
           │  kubectl apply
           ▼
        AWS EKS Cluster
           ├── Deployment (2 replicas)
           ├── Service (ClusterIP :80 → :5000)
           └── ServiceMonitor
                   │
                   ▼
              Prometheus ──▶ Grafana Dashboard
```

---

## 2. Prerequisites

Install all tools on your local machine before starting.

### Tools Required

| Tool | Version | Install |
|------|---------|---------|
| Python | 3.11+ | https://python.org |
| Docker | latest | https://docs.docker.com/get-docker |
| kubectl | latest | https://kubernetes.io/docs/tasks/tools |
| Terraform | >= 1.3.0 | https://developer.hashicorp.com/terraform/install |
| AWS CLI | v2 | https://aws.amazon.com/cli |
| Helm | v3 | https://helm.sh/docs/intro/install |
| ArgoCD CLI | latest | https://argo-cd.readthedocs.io/en/stable/cli_installation |
| Git | latest | https://git-scm.com |

### AWS Account Setup

```bash
# Configure AWS credentials
aws configure

# Enter when prompted:
# AWS Access Key ID:     <your-access-key>
# AWS Secret Access Key: <your-secret-key>
# Default region name:   ap-south-1
# Default output format: json

# Verify
aws sts get-caller-identity
```

### DockerHub Account

- Create a free account at https://hub.docker.com
- Create a repository named `devops-site`
- Note your username (used as `DOCKER_USER` in Jenkins)

---

## 3. Project Structure

```
devOps-Site/
├── app.py                  # Flask application
├── requirements.txt        # Python dependencies
├── Dockerfile              # Container build instructions
├── Jenkinsfile             # CI/CD pipeline
├── main.tf                 # Terraform EKS infrastructure
├── k8s-manifest.yaml       # Kubernetes Deployment + Service
├── servicemonitor.yaml     # Prometheus scrape config
├── argocdapp.yaml          # ArgoCD Application definition
├── README.md
├── .gitignore
├── data/
│   ├── courses.json
│   ├── roadmap.json
│   └── testimonials.json
├── static/
│   └── style.css
└── templates/
    ├── base.html
    └── index.html
```

---

## 4. Step 1 — Flask App Setup

### 1.1 Clone the Repository

```bash
git clone https://github.com/devopsplan2026/devOps-Site.git
cd devOps-Site
```

### 1.2 Create Virtual Environment

```bash
python3 -m venv .venv

# Activate — macOS/Linux
source .venv/bin/activate

# Activate — Windows PowerShell
.venv\Scripts\Activate.ps1
```

### 1.3 Add Prometheus Exporter to the App

Install the exporter:

```bash
pip install prometheus-flask-exporter
```

Update `requirements.txt`:

```
Flask==2.3.3
gunicorn==21.2.0
prometheus-flask-exporter==0.23.1
```

Edit `app.py` — add these 2 lines after `app = Flask(__name__)`:

```python
from prometheus_flask_exporter import PrometheusMetrics

app = Flask(__name__)
metrics = PrometheusMetrics(app)   # auto-registers /metrics route
```

### 1.4 Run Locally to Verify

```bash
pip install -r requirements.txt
python app.py
```

Open in browser:

- App → http://127.0.0.1:5000
- Metrics → http://127.0.0.1:5000/metrics ✅

### 1.5 Commit Changes

```bash
git add requirements.txt app.py
git commit -m "feat: add prometheus metrics exporter"
git push origin main
```

---

## 5. Step 2 — Dockerize the App

### 2.1 Dockerfile

Create `Dockerfile` in the project root:

```dockerfile
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    FLASK_ENV=production

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .
COPY data/ data/
COPY static/ static/
COPY templates/ templates/

EXPOSE 5000

CMD ["python", "app.py"]
```

### 2.2 Add .dockerignore

Create `.dockerignore` in the project root:

```
.venv/
__pycache__/
*.pyc
.env
*.sqlite3
.git/
```

### 2.3 Build and Test Locally

```bash
# Build the image
docker build -t devops-site:test .

# Run the container
docker run -p 5000:5000 devops-site:test

# Verify
curl http://localhost:5000
curl http://localhost:5000/metrics
```

### 2.4 Push to DockerHub

```bash
docker login

docker tag devops-site:test <your-dockerhub-username>/devops-site:test
docker push <your-dockerhub-username>/devops-site:test
```

### 2.5 Commit Dockerfile

```bash
git add Dockerfile .dockerignore
git commit -m "feat: add Dockerfile"
git push origin main
```

---

## 6. Step 3 — Provision EKS with Terraform

### 6.1 main.tf Overview

The `main.tf` file provisions:

- **VPC** with 3 public + 3 private subnets across 3 AZs
- **NAT Gateway** for private subnet internet access
- **EKS Cluster** (`devops-site-cluster`) on Kubernetes 1.30
- **Managed Node Group** — 2x `t3.medium` nodes (scales 1–3)
- **Cluster Add-ons** — CoreDNS, kube-proxy, VPC-CNI, EKS Pod Identity

### 6.2 Initialize Terraform

```bash
terraform init
```

Expected output:

```
Initializing modules...
Initializing provider plugins...
Terraform has been successfully initialized!
```

### 6.3 Plan Infrastructure

```bash
terraform plan
```

Review the output. You should see ~50 resources to be created including VPC, subnets, EKS cluster, and node groups.

### 6.4 Apply Infrastructure

```bash
terraform apply
```

Type `yes` when prompted. This takes **10–15 minutes**.

```
Apply complete! Resources: 52 added, 0 changed, 0 destroyed.

Outputs:
  cluster_name     = "devops-site-cluster"
  cluster_endpoint = "https://XXXX.gr7.ap-south-1.eks.amazonaws.com"
  configure_kubectl = "aws eks update-kubeconfig --region ap-south-1 --name devops-site-cluster"
```

### 6.5 Configure kubectl

```bash
aws eks update-kubeconfig --region ap-south-1 --name devops-site-cluster

# Verify nodes are ready
kubectl get nodes
```

Expected output:

```
NAME                                       STATUS   ROLES    AGE   VERSION
ip-10-0-1-XXX.ap-south-1.compute.internal Ready    <none>   2m    v1.30.x
ip-10-0-2-XXX.ap-south-1.compute.internal Ready    <none>   2m    v1.30.x
```

---

## 7. Step 4 — CI/CD with Jenkins

### 7.1 Install Jenkins on EC2

Launch a `t3.medium` EC2 instance (Ubuntu 22.04) and run:

```bash
# Install Java
sudo apt update
sudo apt install -y openjdk-17-jdk

# Install Jenkins
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key \
  | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ \
  | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt update
sudo apt install -y jenkins
sudo systemctl enable --now jenkins

# Install Docker
sudo apt install -y docker.io
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

Access Jenkins at `http://<EC2-PUBLIC-IP>:8080`

Get the initial password:

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

### 7.2 Install Jenkins Plugins

Go to **Manage Jenkins → Plugins → Available** and install:

- GitHub Integration Plugin
- Docker Pipeline
- Credentials Binding Plugin

### 7.3 Add Credentials

Go to **Manage Jenkins → Credentials → System → Global → Add Credentials**:

**DockerHub Credential:**

```
Kind:     Username with password
ID:       DOCKERHUB_CRAD
Username: <your-dockerhub-username>
Password: <your-dockerhub-password>
```

**GitHub Credential:**

```
Kind:     Username with password
ID:       GITHUB_CRED
Username: <your-github-username>
Password: <your-github-personal-access-token>
```

> Create a GitHub PAT at: Settings → Developer Settings → Personal Access Tokens → with `repo` scope.

### 7.4 Jenkinsfile

The `Jenkinsfile` in the repo has 4 stages:

```
Checkout → Build → Login & Push → Update Manifest
```

| Stage | What it does |
|-------|-------------|
| **Checkout** | Pulls latest code from GitHub main branch |
| **Build** | Generates version tag from timestamp, builds Docker image |
| **Login & Push** | Authenticates to DockerHub, tags and pushes the image |
| **Update Manifest** | Updates image tag in `k8s-manifest.yaml`, commits and pushes to Git |

Add the **Update Manifest** stage to your Jenkinsfile after the Login & Push stage:

```groovy
stage('Update Manifest') {
  steps {
    withCredentials([usernamePassword(
      credentialsId: 'GITHUB_CRED',
      usernameVariable: 'GIT_USER',
      passwordVariable: 'GIT_PASS'
    )]) {
      sh """
        sed -i 's|image:.*|image: \$DOCKER_USER/${IMAGE}:${env.VERSION}|' k8s-manifest.yaml
        git config user.email "jenkins@devopsacademy.co"
        git config user.name  "Jenkins"
        git add k8s-manifest.yaml
        git commit -m "ci: update image to ${env.VERSION} [skip ci]"
        git push https://\$GIT_USER:\$GIT_PASS@github.com/devopsplan2026/devOps-Site.git main
      """
    }
  }
}
```

### 7.5 Create the Pipeline Job

1. New Item → **Pipeline** → name it `devops-site`
2. Under **Build Triggers** → check **GitHub hook trigger for GITScm polling**
3. Under **Pipeline** → Definition: `Pipeline script from SCM`
   - SCM: Git
   - Repository URL: `https://github.com/devopsplan2026/devOps-Site.git`
   - Branch: `*/main`
   - Script Path: `Jenkinsfile`
4. Click **Save**

### 7.6 Configure GitHub Webhook

In your GitHub repo → **Settings → Webhooks → Add webhook**:

```
Payload URL:  http://<JENKINS-EC2-IP>:8080/github-webhook/
Content type: application/json
Events:       Just the push event
```

Now every `git push` to `main` automatically triggers the pipeline.

### 7.7 Run the Pipeline

```bash
# Trigger manually first to verify
git commit --allow-empty -m "test: trigger jenkins pipeline"
git push origin main
```

Watch the pipeline run in the Jenkins UI. All 4 stages should go green ✅.

---

## 8. Step 5 — Deploy to Kubernetes

### 8.1 k8s-manifest.yaml Overview

The manifest contains two resources separated by `---`:

**Deployment:**
- 2 replicas of the Flask container
- Image pulled from DockerHub
- Container port 5000

**Service:**
- ClusterIP type (internal only)
- Port 80 → Pod port 5000
- Label `release: prometheus` for ServiceMonitor discovery

### 8.2 Apply the Manifest

```bash
kubectl apply -f k8s-manifest.yaml
```

### 8.3 Verify Deployment

```bash
# Check pods are running
kubectl get pods
# NAME                           READY   STATUS    RESTARTS   AGE
# devops-site-7d9f6b8c4-abc12   1/1     Running   0          30s
# devops-site-7d9f6b8c4-def34   1/1     Running   0          30s

# Check service
kubectl get svc devops-site-service
# NAME                  TYPE        CLUSTER-IP      PORT(S)   AGE
# devops-site-service   ClusterIP   172.20.45.123   80/TCP    30s

# Test the app from inside the cluster
kubectl run curl-test --image=curlimages/curl --rm -it --restart=Never \
  -- curl http://devops-site-service/metrics
```

### 8.4 Expose with a LoadBalancer (optional)

To make the app publicly accessible:

```bash
kubectl patch svc devops-site-service \
  -p '{"spec":{"type":"LoadBalancer"}}'

# Get the external IP (takes 2-3 min for AWS to provision ELB)
kubectl get svc devops-site-service
```

---

## 9. Step 6 — Monitoring with Prometheus & Grafana

### 9.1 Install Prometheus Stack via Helm

```bash
helm repo add prometheus-community \
  https://prometheus-community.github.io/helm-charts
helm repo update

helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --set prometheus.prometheusSpec.serviceMonitorSelectorNilUsesHelmValues=false
```

Wait for all pods to be ready:

```bash
kubectl get pods -n monitoring
```

### 9.2 How ServiceMonitor Works

The `servicemonitor.yaml` tells Prometheus **what** to scrape:

```
servicemonitor.yaml                k8s-manifest.yaml
────────────────────               ─────────────────
spec.selector:                     Service labels:
  matchLabels:          ────────▶    app: devops-site  ✅
    app: devops-site

endpoints:                         Service ports:
  - port: http          ────────▶    - name: http      ✅
    path: /metrics                     port: 80
    interval: 15s                      targetPort: 5000

namespaceSelector:                 Service namespace:
  matchNames: [default] ────────▶    namespace: default ✅

metadata.labels:                   Prometheus Operator:
  release: prometheus   ────────▶  serviceMonitorSelector:
                                     release: prometheus ✅
```

### 9.3 Apply ServiceMonitor

```bash
kubectl apply -f servicemonitor.yaml

# Verify it was created
kubectl get servicemonitor -n monitoring
```

### 9.4 Verify Prometheus is Scraping

```bash
kubectl port-forward svc/prometheus-kube-prometheus-prometheus \
  -n monitoring 9090:9090
```

Open http://localhost:9090/targets → find `devops-site` → status should be **UP** ✅

### 9.5 Access Grafana

```bash
kubectl port-forward svc/prometheus-grafana -n monitoring 3000:80
```

Open http://localhost:3000

```
Username: admin
Password: prom-operator
```

### 9.6 Useful PromQL Queries

In Grafana → Explore, try these queries:

```promql
# HTTP request rate (requests per second)
rate(flask_http_request_total[1m])

# Error rate (5xx responses)
rate(flask_http_request_total{status=~"5.."}[1m])

# Response latency — 99th percentile
histogram_quantile(0.99,
  rate(flask_http_request_duration_seconds_bucket[5m])
)

# Total requests by endpoint
sum by (path) (flask_http_request_total)
```

---

## 10. Step 7 — GitOps with ArgoCD

### 10.1 Install ArgoCD on EKS

```bash
kubectl create namespace argocd

kubectl apply -n argocd \
  -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Wait for ArgoCD server to be ready
kubectl wait --for=condition=available deployment \
  -l app.kubernetes.io/name=argocd-server \
  -n argocd --timeout=120s
```

### 10.2 Access ArgoCD UI

```bash
# Port-forward the UI
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Get the initial admin password
kubectl get secret argocd-initial-admin-secret \
  -n argocd \
  -o jsonpath="{.data.password}" | base64 -d && echo
```

Open https://localhost:8080 → login: `admin` / `<password-from-above>`

### 10.3 How argocdapp.yaml Works

| Field | Value | Purpose |
|-------|-------|---------|
| `repoURL` | GitHub repo URL | ArgoCD watches this repo for changes |
| `targetRevision: main` | main branch | only tracks the main branch |
| `path: .` | repo root | applies all YAMLs found in root |
| `destination.namespace` | default | deploys resources into default namespace |
| `prune: true` | — | deletes cluster resources when removed from Git |
| `selfHeal: true` | — | reverts manual `kubectl` changes back to Git state |
| `CreateNamespace=true` | — | auto-creates destination namespace if missing |

### 10.4 Apply the ArgoCD Application

```bash
kubectl apply -f argocdapp.yaml

# Check sync status
kubectl get application devops-site -n argocd
```

### 10.5 Verify GitOps is Working

ArgoCD syncs every 3 minutes automatically. To force an immediate sync:

```bash
# Using CLI
argocd login localhost:8080 --username admin --insecure
argocd app sync devops-site

# Check full status
argocd app get devops-site
```

In the UI you will see a live dependency graph:

```
Application: devops-site
  ├── Deployment/devops-site        ✅ Synced
  │     └── ReplicaSet
  │           ├── Pod (replica 1)  ✅ Healthy
  │           └── Pod (replica 2)  ✅ Healthy
  ├── Service/devops-site-service   ✅ Synced
  └── ServiceMonitor/devops-site-sm ✅ Synced
```

---

## 11. Full Pipeline Flow

Once everything is set up, this is what happens automatically on every `git push`:

```
Step 1:  Developer pushes code to GitHub main branch
         │
Step 2:  GitHub webhook triggers Jenkins pipeline
         │
Step 3:  Jenkins — Checkout stage
         Pulls latest code from GitHub
         │
Step 4:  Jenkins — Build stage
         Generates VERSION=202501011200
         Runs: docker build -t devops-site:202501011200 .
         │
Step 5:  Jenkins — Login & Push stage
         Logs into DockerHub with DOCKERHUB_CRAD credentials
         Tags and pushes image to DockerHub
         │
Step 6:  Jenkins — Update Manifest stage
         Updates image tag in k8s-manifest.yaml
         Commits and pushes back to GitHub
         │
Step 7:  ArgoCD detects change in GitHub (within 3 minutes)
         Compares Git state vs cluster state
         Finds image tag is different → out of sync
         │
Step 8:  ArgoCD syncs
         Runs: kubectl apply -f k8s-manifest.yaml
         Kubernetes performs a rolling update
         Old pods replaced with new ones (zero downtime)
         │
Step 9:  Prometheus scrapes /metrics every 15 seconds
         Grafana dashboards update in real time
```

---

## 12. Troubleshooting

### Jenkins pipeline fails at Build stage

```bash
# Check Docker is accessible by Jenkins user
sudo su - jenkins
docker ps

# If permission denied, add jenkins to docker group
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

### Pods stuck in ImagePullBackOff

```bash
kubectl describe pod <pod-name>

# Common causes:
# 1. Wrong image name — check k8s-manifest.yaml image field
# 2. DockerHub rate limit — add imagePullSecrets
kubectl create secret docker-registry dockerhub-secret \
  --docker-username=<user> \
  --docker-password=<pass> \
  --docker-email=<email>
```

### ServiceMonitor not picked up by Prometheus

```bash
# Verify label matches Prometheus release name
kubectl get prometheus -n monitoring -o yaml | grep serviceMonitorSelector

# Verify ServiceMonitor exists
kubectl get servicemonitor -n monitoring

# Check the release label matches
kubectl get svc devops-site-service -o yaml | grep release
```

### ArgoCD shows OutOfSync but won't sync

```bash
# Force a hard refresh
argocd app get devops-site --hard-refresh

# Check for sync errors
argocd app get devops-site

# If RBAC issue, verify ArgoCD has cluster-admin
kubectl get clusterrolebinding | grep argocd
```

### Terraform apply fails

```bash
# Verify AWS credentials
aws sts get-caller-identity

# Check you have required IAM permissions:
# AmazonEKSFullAccess
# AmazonVPCFullAccess
# IAMFullAccess
# AmazonEC2FullAccess
```

### EKS nodes not joining the cluster

```bash
kubectl get nodes
kubectl describe node <node-name>

# Check node group status in AWS console
aws eks describe-nodegroup \
  --cluster-name devops-site-cluster \
  --nodegroup-name default
```

---

## Contact

| | |
|--|--|
| **Phone** | +91 97982-53860 |
| **Email** | info@devopsacademy.co |
| **Location** | BTM Layout, Bengaluru, Karnataka 560076 |
| **Website** | www.devopsacademy.co |

---

*© 2026 DevOps Academy. Built with Flask, deployed on AWS EKS.*
