import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const Portfolio: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white">
      <Navbar/>
      <header className="flex items-center justify-between p-4 bg-opacity-20 backdrop-blur-xl">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">My Portfolio</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#about" className="hover:text-purple-400 transition-colors">About</a></li>
            <li><a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a></li>
            <li><a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section id="about" className="p-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-gray-400">I am a passionate developer with experience in building web applications. I love creating interactive and user-friendly interfaces.</p>
        </motion.div>
      </section>

      <section id="projects" className="p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Example project item */}
          <motion.div className="p-4 bg-gray-700 rounded-lg hover:scale-105 transition-transform" whileHover={{ scale: 1.05 }}>
            <h3 className="text-lg font-bold">Project Title</h3>
            <p className="text-gray-400">Description of the project goes here.</p>
          </motion.div>
          {/* Add more project items as needed */}
        </motion.div>
      </section>

      <section id="contact" className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Me</h2>
        <p className="text-gray-400">Feel free to reach out via email or social media.</p>
      </section>

      <footer className="p-4 text-center">
        <p className="text-gray-500">© 2025 My Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;
