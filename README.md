# DevOps Academy Flask Application

A clean, maintainable Python Flask application for the DevOps Academy landing page. This project includes a one-page course overview, roadmap, student testimonials, and an enrollment form.

## Project Structure

```
DevOps-Site/
├── app.py
├── requirements.txt
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

## Features

- Flask web app with one main route
- Data-driven curriculum, roadmap, and testimonial sections
- Enrollment form with server-side validation
- Clean responsive UI and modern styling
- No unnecessary frontend build tools or node dependencies

## Prerequisites

- Python 3.11+ installed
- `pip` available

## Setup from Scratch

1. Clone the repository:

```bash
git clone https://github.com/devopsplan2026/devOps-Site.git
cd DevOps-Site
```

2. Create a Python virtual environment:

```bash
python3 -m venv .venv
```

3. Activate the virtual environment:

macOS / Linux:
```bash
source .venv/bin/activate
```

Windows PowerShell:
```powershell
.venv\Scripts\Activate.ps1
```

4. Install dependencies:

```bash
pip install -r requirements.txt
```

5. Run the Flask application:

```bash
python app.py
```

6. Open the app in your browser:

```
http://127.0.0.1:5000
```

## Development Notes

- The enrollment form posts to `/apply` and displays success or error messages.
- Static page content is loaded from `data/*.json` for easy updates.
- The app uses Flask templates and a separate CSS file for styling.

## Clean Deployment

To deploy this app on a new environment:

1. Install Python.
2. Clone the repo.
3. Create and activate a virtual environment.
4. Install dependencies from `requirements.txt`.
5. Run `python app.py`.

## Contact

- Phone: +91 97982-53860
- Email: info@devopsacademy.co
- Location: BTM Layout, Bengaluru, Karnataka 560076
