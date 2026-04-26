import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Star, TrendingUp, Users, DollarSign } from 'lucide-react';

// Memoized stats to prevent re-rendering
const StatCard = memo(({ stat }) => (
  <div className="glass-card rounded-2xl p-6 text-center border border-white/5 hover:border-white/20 transition-all">
    <div className="flex justify-center">{stat.icon}</div>
    <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
    <p className="text-gray-400 text-sm">{stat.label}</p>
  </div>
));

StatCard.displayName = 'StatCard';

const Hero = () => {
  const stats = [
    { icon: <Users className="text-blue-400 mb-2" size={28} />, value: "1000+", label: "Placed Students" },
    { icon: <TrendingUp className="text-purple-400 mb-2" size={28} />, value: "300%", label: "Average Hike" },
    { icon: <DollarSign className="text-green-400 mb-2" size={28} />, value: "$114K", label: "Avg Salary" },
    { icon: <Star className="text-yellow-400 mb-2" size={28} />, value: "4.9/5", label: "Student Rating" },
  ];

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full glass-card border border-blue-500/30 text-blue-400 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse mr-2"></span>
            Admissions Open for 2026 Batch
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
          >
            AWS DevOps Training <br className="hidden sm:block" />
            <span className="text-gradient">with GenAI</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            Bengaluru's premier job-oriented training program. Master cloud infrastructure, CI/CD, containerization, and AI-powered operations.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <a 
              href="#enroll" 
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
            >
              Enroll Now <ArrowRight className="ml-2" size={20} />
            </a>
            <a 
              href="#" 
              className="w-full sm:w-auto px-8 py-4 rounded-full glass-card text-white font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
            >
              Download Brochure <Download className="ml-2" size={20} />
            </a>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
        >
          {stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Hero);
