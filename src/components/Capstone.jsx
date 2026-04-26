import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Code2, Database, Terminal } from 'lucide-react';

const Capstone = () => {
  return (
    <section className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden glass-card border border-purple-500/30 p-1"
        >
          {/* Animated gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 opacity-20 animate-pulse"></div>
          
          <div className="bg-[#0a0f1e]/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              
              <div className="flex-1">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-6">
                  <Bot size={14} className="mr-2" /> Signature Capstone Project
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  AI-Powered Log Analyzer & <span className="text-gradient">Monitoring Chatbot</span>
                </h2>
                
                <p className="text-gray-400 mb-8 text-lg">
                  Integrate LLMs with your infrastructure. Build a Slack/Discord bot that can automatically analyze Kubernetes pod failures, summarize AWS CloudWatch logs using LangChain, and suggest remediation steps.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <Terminal size={16} />, text: "Automated Root Cause" },
                    { icon: <Code2 size={16} />, text: "Python & LangChain" },
                    { icon: <Database size={16} />, text: "Vector Embeddings" },
                    { icon: <Bot size={16} />, text: "Slack Bot Integration" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-300 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                      <span className="text-purple-400 mr-2">{item.icon}</span>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-5/12 flex justify-center">
                <div className="relative w-full max-w-sm aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-full blur-3xl opacity-30 animate-blob"></div>
                  <div className="relative h-full glass-card border border-white/20 rounded-2xl p-6 flex flex-col shadow-2xl">
                    <div className="flex items-center border-b border-white/10 pb-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                        <Bot className="text-purple-400" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">DevOps Copilot</p>
                        <p className="text-xs text-green-400">Online</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 flex-1">
                      <div className="bg-white/5 p-3 rounded-lg rounded-tl-none border border-white/10 max-w-[80%] text-sm text-gray-300">
                        Pod `nginx-ingress` is CrashLoopBackOff. Why?
                      </div>
                      <div className="bg-purple-500/20 p-3 rounded-lg rounded-tr-none border border-purple-500/30 max-w-[90%] ml-auto text-sm text-gray-200">
                        Analyzing logs... The pod is failing due to an OOMKilled error. Memory usage spiked to 512MB (limit is 256MB). Recommend increasing the memory limit in the Deployment YAML.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Capstone;
