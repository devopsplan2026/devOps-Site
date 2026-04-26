import React, { memo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Curriculum from './components/Curriculum';
import Roadmap from './components/Roadmap';
import Features from './components/Features';
import Capstone from './components/Capstone';
import Testimonials from './components/Testimonials';
import EnrollForm from './components/EnrollForm';
import Contact from './components/Contact';
import WhatsAppBtn from './components/WhatsAppBtn';

// Memoize static components to prevent unnecessary re-renders
const MemoizedAbout = memo(About);
const MemoizedCapstone = memo(Capstone);
const MemoizedTestimonials = memo(Testimonials);
const MemoizedContact = memo(Contact);
const MemoizedWhatsAppBtn = memo(WhatsAppBtn);

// Background decoration component
const BackgroundDecoration = memo(() => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px] animate-blob"></div>
    <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px] animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-cyan-900/20 blur-[120px] animate-blob animation-delay-4000"></div>
  </div>
));

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a0f1e]">
      {/* Background decoration */}
      <BackgroundDecoration />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <MemoizedAbout />
          <Curriculum />
          <Roadmap />
          <Features />
          <MemoizedCapstone />
          <MemoizedTestimonials />
          <EnrollForm />
        </main>
        <MemoizedContact />
      </div>
      
      <MemoizedWhatsAppBtn />
    </div>
  );
}

export default App;
