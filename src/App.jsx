import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { ArrowDown, Code, TrendingUp, Zap, ExternalLink, Sparkles, Rocket, Target } from 'lucide-react'
import ParticleBackground from './components/ParticleBackground.jsx'
import './App.css'

function App() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="min-h-screen bg-black text-white font-serif overflow-x-hidden relative">
      {/* WebGL Particle Background */}
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center content-layer">
        {/* Animated Background Elements */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          style={{ y, opacity }}
        >
          <motion.div 
            className="absolute top-1/2 right-20 w-8 h-8 bg-yellow-400 rounded-full"
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
        </motion.div>

        <div className="text-center z-10 max-w-6xl mx-auto px-4">
          <div className="glass-blur p-8 sm:p-10 md:p-12 lg:p-16 mx-2 sm:mx-4 md:mx-6 lg:mx-8 mb-8 min-h-fit">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-6 break-words"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="text-white">Scale</span>
              <span className="text-yellow-400">System</span>
              <span className="text-white">.ai</span>
            </motion.h1>
            
            <motion.p 
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-4 sm:mb-6 text-gray-300 font-light px-6 break-words"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Build Software. Scale Brands. Execute Vision.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Button 
              className="bg-yellow-400 text-black hover:bg-yellow-300 text-lg px-8 py-3 rounded-xl font-serif font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-400/25"
            >
              Explore Our Work
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="text-yellow-400 w-6 h-6" />
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto content-layer">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 glass-blur p-8 mx-4 sm:mx-6 md:mx-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Multi-Disciplinary <span className="text-yellow-400">Excellence</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our unique approach combines software development with digital marketing expertise, 
            allowing us to rapidly build and bring products to market. We excel at both 
            in-house innovation and helping others execute their vision.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-yellow-400/50 transition-all duration-300 h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Code className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 group-hover:text-yellow-400 transition-colors">Software Development</h3>
              <p className="text-gray-400 leading-relaxed">Cutting-edge applications built with modern technologies and best practices for scalable, robust solutions.</p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-yellow-400/50 transition-all duration-300 h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 group-hover:text-yellow-400 transition-colors">Digital Marketing</h3>
              <p className="text-gray-400 leading-relaxed">Strategic brand scaling through data-driven marketing campaigns that deliver measurable results.</p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Target className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-yellow-400/50 transition-all duration-300 h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 group-hover:text-yellow-400 transition-colors">Rapid Execution</h3>
              <p className="text-gray-400 leading-relaxed">From concept to market in record time with our streamlined processes and agile methodology.</p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Zap className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto content-layer">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 glass-blur p-8 mx-4 sm:mx-6 md:mx-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Our <span className="text-yellow-400">Founders</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Visionary leaders combining deep industry expertise with proven track records 
            in scaling businesses and building cutting-edge technology solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Marcello Cesarini */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-black/90 backdrop-blur-sm rounded-3xl border border-gray-700 group-hover:border-yellow-400/60 transition-all duration-500 p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-black font-bold text-xl">MC</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Marcello Cesarini</h3>
                  <p className="text-yellow-400 font-semibold">Founder & CEO</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                CEO of Facial Mania Med Spa, the nation's leading medical spa franchise, 
                rapidly expanding to 25 locations across the country.
              </p>
              <p className="text-gray-400 text-sm">
                Proven expertise in franchise development, business scaling, and operational excellence 
                in the healthcare and wellness industry.
              </p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
          </motion.div>

          {/* Ajeet "AJ" Kokatay */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-black/90 backdrop-blur-sm rounded-3xl border border-gray-700 group-hover:border-yellow-400/60 transition-all duration-500 p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">AJ</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Ajeet "AJ" Kokatay</h3>
                  <p className="text-yellow-400 font-semibold">Founder & CTO</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Experienced software architect and marketer with expertise building 
                mission-critical infrastructure for Silicon Valley giants & YC-funded startups.
              </p>
              <p className="text-gray-400 text-sm">
                Deep technical expertise in scalable systems, combined with strategic digital marketing 
                insights.
              </p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Code className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6 bg-gray-900/50 backdrop-blur-sm content-layer">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 glass-blur p-8 mx-4 sm:mx-6 md:mx-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ongoing <span className="text-yellow-400">Projects</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Multi-disciplinary innovation that transforms concepts into scalable brands and software.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Morrow */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div 
                className="relative bg-black/90 backdrop-blur-sm rounded-3xl border border-gray-700 group-hover:border-yellow-400/60 transition-all duration-500 overflow-hidden cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open('https://morrowapp.com', '_blank', 'noopener,noreferrer');
                }}
              >
                <div className="h-48 bg-gradient-to-br from-gray-400 via-gray-300 to-gray-400 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10"></div>
                  <img src="/morrow_cropped.png" alt="Morrow Logo" className="h-24 w-auto z-10 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/15 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-yellow-400 transition-colors duration-300">Morrow</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">AI-enhanced gamified self improvement app that transforms personal growth into an engaging, measurable journey with smart insights.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 bg-gray-800 px-3 py-1 rounded-full">AI • Gamification</span>
                    <ExternalLink className="w-5 h-5 text-yellow-400 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ScanMe.Baby */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-pink-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div 
                className="relative bg-black/90 backdrop-blur-sm rounded-3xl border border-gray-700 group-hover:border-yellow-400/60 transition-all duration-500 overflow-hidden cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open('https://scanme.baby', '_blank', 'noopener,noreferrer');
                }}
              >
                <div className="h-48 bg-gradient-to-br from-gray-400 via-gray-300 to-gray-400 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10"></div>
                  <img src="/Scanme.BabyFinalLogo2.jpg" alt="ScanMe.Baby Logo" className="h-20 w-auto z-10 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute top-6 right-6 w-12 h-12 border-2 border-white/30 rounded-lg rotate-12 group-hover:rotate-45 transition-transform duration-500"></div>
                  <div className="absolute bottom-6 left-6 w-8 h-8 bg-white/20 rounded-xl group-hover:scale-125 transition-transform duration-300"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-yellow-400 transition-colors duration-300">ScanMe.Baby</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">DTC Fashion Tech company using artistic QR codes that link to social media for seamless in-person networking and brand connection.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 bg-gray-800 px-3 py-1 rounded-full">Fashion • Tech</span>
                    <ExternalLink className="w-5 h-5 text-yellow-400 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SaleSystem.ai */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-cyan-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div 
                className="relative bg-black/90 backdrop-blur-sm rounded-3xl border border-gray-700 group-hover:border-yellow-400/60 transition-all duration-500 overflow-hidden cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open('https://salesystem.ai', '_blank', 'noopener,noreferrer');
                }}
              >
                <div className="h-48 bg-gradient-to-br from-gray-400 via-gray-300 to-gray-400 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10"></div>
                  <img src="/salesystemcrop.png" alt="SaleSystem.ai Logo" className="h-20 w-auto z-10 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-xl group-hover:rotate-12 transition-transform duration-300"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/15 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                  <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white/10 rounded group-hover:scale-150 transition-transform duration-300"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-yellow-400 transition-colors duration-300">SaleSystem.ai</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">Revolutionary all-in-one CRM+POS+Phone+Payroll+Booking system enhanced by AI insights for complete business management.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 bg-gray-800 px-3 py-1 rounded-full">AI • Business</span>
                    <ExternalLink className="w-5 h-5 text-yellow-400 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 content-layer">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-blur p-8 mx-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="text-yellow-400">Execute</span> Your Vision?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you have an in-house project or need help bringing your ideas to life, 
              we're here to build, scale, and deliver exceptional results.
            </p>
            <Button 
              className="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black text-lg px-8 py-3 rounded-xl font-serif font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-400/25"
            >
              Get In Touch
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800 content-layer">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 ScaleSystem.ai. Building the future, one project at a time.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App

