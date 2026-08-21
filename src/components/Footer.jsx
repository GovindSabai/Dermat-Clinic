import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border mt-auto pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="mb-4 inline-block relative">
              <img 
                src="/logo.png" 
                alt="Dermat Clinic Logo" 
                className="h-12 w-auto object-contain object-left transition-all duration-300 dark:opacity-0"
              />
              <img 
                src="/logo-dark.png" 
                alt="Dermat Clinic Logo Dark" 
                className="absolute top-0 left-0 w-full h-full object-contain object-left transition-all duration-300 opacity-0 dark:opacity-100 pointer-events-none"
              />
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Advanced Dermatology. Personalized Care. Healthy Skin Starts With Expert Care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" onClick={() => window.scrollTo(0, 0)} className="text-sm text-text-secondary hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" onClick={() => window.scrollTo(0, 0)} className="text-sm text-text-secondary hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/doctors" onClick={() => window.scrollTo(0, 0)} className="text-sm text-text-secondary hover:text-primary transition-colors">Doctors</Link></li>
              <li><Link to="/our-team" onClick={() => window.scrollTo(0, 0)} className="text-sm text-text-secondary hover:text-primary transition-colors">Our Team</Link></li>
              <li><Link to="/treatments" onClick={() => window.scrollTo(0, 0)} className="text-sm text-text-secondary hover:text-primary transition-colors">Treatments</Link></li>
              <li><Link to="/before-after" onClick={() => window.scrollTo(0, 0)} className="text-sm text-text-secondary hover:text-primary transition-colors">Before & After</Link></li>
            </ul>
          </div>

          {/* Patient Resources */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Patient Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/conditions" onClick={() => window.scrollTo(0, 0)} className="text-sm text-text-secondary hover:text-primary transition-colors">Conditions</Link></li>
              <li><Link to="/blog" onClick={() => window.scrollTo(0, 0)} className="text-sm text-text-secondary hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/faq" onClick={() => window.scrollTo(0, 0)} className="text-sm text-text-secondary hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/appointment" onClick={() => window.scrollTo(0, 0)} className="text-sm text-text-secondary hover:text-primary transition-colors">Book Appointment</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>123 Derma Lane, Wellness District</li>
              <li>New Delhi, ND 110001 (Demo)</li>
              <li className="pt-2">Phone: <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">+91 (123) 456-7890</a></li>
              <li>Email: <a href="mailto:hello@dermatclinic.demo" className="hover:text-primary transition-colors">hello@dermatclinic.demo</a></li>
              <li className="pt-2">Hours: Mon-Sat, 9AM - 6PM</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="border-t border-border pt-8 text-center text-xs text-text-secondary">
          <p className="mb-4 max-w-4xl mx-auto">
            <strong>Medical Disclaimer:</strong> This website is for general educational and informational purposes only. Information on this website should not be considered a substitute for professional medical advice, diagnosis, or treatment. Individual treatment suitability may vary. Please consult a qualified healthcare professional for personalized advice.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <span>&copy; {new Date().getFullYear()} Dermat Clinic. All rights reserved.</span>
            <span className="hidden sm:inline">|</span>
            <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
