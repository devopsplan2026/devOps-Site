import React, { useState, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { Search, Terminal, Cloud, GitMerge, Box, Activity, Cpu } from 'lucide-react';
import coursesData from '../data/courses.json';

const iconMap = {
  'terminal': <Terminal size={24} />,
  'cloud': <Cloud size={24} />,
  'git-merge': <GitMerge size={24} />,
  'box': <Box size={24} />,
  'activity': <Activity size={24} />,
  'cpu': <Cpu size={24} />
};

// Memoized course card component to prevent re-renders
const CourseCard = memo(({ course, idx }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    key={idx}
    className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300 border border-white/5 hover:border-blue-500/30 group"
  >
    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:text-purple-400 transition-colors">
      {iconMap[course.icon]}
    </div>
    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2 block">{course.category}</span>
    <h3 className="text-xl font-bold text-white mb-3">{course.title}</h3>
    <p className="text-gray-400 mb-6 text-sm line-clamp-2">{course.description}</p>
    
    <div className="flex flex-wrap gap-2">
      {course.tools.map((tool, tIdx) => (
        <span key={tIdx} className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-md text-gray-300">
          {tool}
        </span>
      ))}
    </div>
  </motion.div>
));

CourseCard.displayName = 'CourseCard';

const Curriculum = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Memoize categories to prevent recalculation
  const categories = useMemo(() => ['All', ...new Set(coursesData.map(course => course.category))], []);

  // Memoize filtered courses to prevent recalculation on every render
  const filteredCourses = useMemo(() => coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.tools.some(tool => tool.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  }), [searchTerm, activeCategory]);

  return (
    <section id="curriculum" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Comprehensive <span className="text-gradient">Curriculum</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Master the tools that power modern infrastructure. Filter by category or search for specific technologies.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'glass-card text-gray-300 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-full leading-5 bg-black/30 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCourses.map((course, idx) => (
            <CourseCard key={idx} course={course} idx={idx} />
          ))}
        </motion.div>
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No modules found matching your search. Try a different term.
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(Curriculum);
