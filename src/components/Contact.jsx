import React from 'react';
import { Phone, Mail, MapPin, Globe, Github, Twitter, Linkedin } from 'lucide-react';

const Contact = () => {
  return (
    <footer id="contact" className="bg-black/60 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="text-2xl font-bold mb-4 inline-block">
              <span className="text-white">DevOps</span>
              <span className="text-gradient ml-1">Academy</span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mt-4 mb-6">
              Bengaluru's premier AWS DevOps & GenAI training institute. Transforming careers, one engineer at a time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <Github size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {['About Us', 'Curriculum', 'Roadmap', 'Features', 'Capstone'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Courses</h3>
            <ul className="space-y-3">
              {['Linux & Git Fundamentals', 'AWS Architecture', 'Terraform & Ansible', 'Jenkins CI/CD', 'Docker & Kubernetes', 'GenAI DevOps'].map((item) => (
                <li key={item}>
                  <a href="#curriculum" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="text-blue-400 mr-3 mt-0.5 flex-shrink-0" size={16} />
                <a href="tel:+919798253860" className="text-gray-400 hover:text-white transition-colors text-sm">
                  +91 97982-53860
                </a>
              </li>
              <li className="flex items-start">
                <Mail className="text-blue-400 mr-3 mt-0.5 flex-shrink-0" size={16} />
                <a href="mailto:info@devopsacademy.co" className="text-gray-400 hover:text-white transition-colors text-sm">
                  info@devopsacademy.co
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="text-blue-400 mr-3 mt-0.5 flex-shrink-0" size={16} />
                <span className="text-gray-400 text-sm">BTM Layout, Bengaluru, Karnataka 560076</span>
              </li>
              <li className="flex items-start">
                <Globe className="text-blue-400 mr-3 mt-0.5 flex-shrink-0" size={16} />
                <a href="https://www.devopsacademy.co" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                  www.devopsacademy.co
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2026 DevOps Academy. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
