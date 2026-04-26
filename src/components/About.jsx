import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, MonitorPlay, Video } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-black/20 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="text-gradient">DevOps Academy</span>
            </h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              Located in the heart of India's Silicon Valley, BTM Layout, Bengaluru, we are a premier training institute dedicated to bridging the gap between academic knowledge and industry requirements.
            </p>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Our comprehensive AWS DevOps program is uniquely designed to integrate traditional DevOps practices with cutting-edge Generative AI tools, ensuring our graduates are future-ready.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                    <MapPin className="text-blue-400" size={20} />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-semibold text-lg">Classroom Training</h4>
                  <p className="text-gray-400">Immersive, hands-on sessions at our BTM Layout center with expert instructors.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <MonitorPlay className="text-purple-400" size={20} />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-semibold text-lg">Live Online</h4>
                  <p className="text-gray-400">Interactive virtual classrooms for out-of-station students or working professionals.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                    <Video className="text-cyan-400" size={20} />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-semibold text-lg">Recorded Sessions</h4>
                  <p className="text-gray-400">Lifetime access to high-quality recordings to learn at your own pace.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
            <div className="glass-card p-2 rounded-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Students collaborating" 
                className="rounded-xl w-full object-cover h-[400px]"
              />
              <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-xl flex items-center shadow-2xl border border-white/10">
                <div className="bg-green-500/20 p-3 rounded-lg mr-4">
                  <MapPin className="text-green-400" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="font-bold text-white">BTM Layout, BLR</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
