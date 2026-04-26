import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ShieldCheck, Award, Target, Laptop, Users, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Laptop size={28} />,
      title: "7+ Live Projects",
      desc: "Implement real-world architectures used by top tech companies.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap size={28} />,
      title: "AI-Powered Learning",
      desc: "Learn to use GenAI tools like ChatGPT and LangChain to automate ops.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Briefcase size={28} />,
      title: "Career Focus",
      desc: "Mock interviews, resume building, and dedicated placement assistance.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Award size={28} />,
      title: "Certification Prep",
      desc: "Aligned with AWS Certified Solutions Architect & CKA exams.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Real Deployments",
      desc: "Deploy code to actual cloud environments, not just local VMs.",
      color: "from-red-500 to-rose-500"
    },
    {
      icon: <Users size={28} />,
      title: "Expert Mentorship",
      desc: "Learn from industry veterans with 10+ years of experience.",
      color: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose <span className="text-gradient">Us?</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">We don't just teach tools; we build engineers ready to tackle complex production environments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-8 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors group"
            >
              <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${feat.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
