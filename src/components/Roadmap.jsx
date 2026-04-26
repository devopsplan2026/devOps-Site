import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2 } from 'lucide-react';
import roadmapData from '../data/roadmap.json';

const Roadmap = () => {
  return (
    <section id="roadmap" className="py-24 bg-black/40 border-y border-white/5 relative overflow-hidden">
      {/* Decorative gradient lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-blue-500/50 to-transparent hidden lg:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Training <span className="text-gradient">Roadmap</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">A structured, 3-month intensive journey to transform you into a highly sought-after DevOps Engineer.</p>
        </div>

        <div className="space-y-12 lg:space-y-0 relative z-10">
          {roadmapData.map((phase, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`flex flex-col lg:flex-row items-center justify-between ${idx % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="w-full lg:w-5/12 mb-8 lg:mb-0">
                <div className="glass-card p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors relative group">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Calendar className="text-white" size={20} />
                  </div>
                  
                  <div className="ml-6">
                    <span className="text-blue-400 font-semibold tracking-wider text-sm uppercase mb-2 block">{phase.phase}</span>
                    <h3 className="text-2xl font-bold text-white mb-4">{phase.title}</h3>
                    
                    <ul className="space-y-3 mb-6">
                      {phase.topics.map((topic, tIdx) => (
                        <li key={tIdx} className="flex items-start text-gray-300 text-sm">
                          <CheckCircle2 className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-sm">
                        <span className="text-purple-400 font-semibold">Milestone:</span> <span className="text-gray-400">{phase.milestone}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Node (Desktop only) */}
              <div className="hidden lg:flex w-2/12 justify-center relative">
                <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] z-10 border-4 border-[#0a0f1e]"></div>
              </div>

              <div className="w-full lg:w-5/12"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
