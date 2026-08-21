import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import toast from 'react-hot-toast';

export const Contact = () => {
  const [messages, setMessages] = useLocalStorage('contact-messages', []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      const newMessage = { ...formData, id: Date.now(), status: 'unread' };
      setMessages([...messages, newMessage]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Dermat Clinic</title>
        <meta name="description" content="Get in touch with Dermat Clinic for any inquiries or to schedule an appointment." />
      </Helmet>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Get In Touch" 
            subtitle="Contact Us"
            centered
          />
          
          <div className="grid lg:grid-cols-5 gap-12 mt-12">
            
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-surface p-8 rounded-3xl shadow-sm border border-border h-full">
                <h3 className="text-2xl font-bold text-text-primary mb-6">Clinic Details</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mr-4">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">Address</p>
                      <p className="text-text-secondary text-sm mt-1">123 Derma Lane, Wellness District<br/>New Delhi, ND 110001 (Demo)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mr-4">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">Phone</p>
                      <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="text-text-secondary text-sm mt-1 hover:text-primary transition-colors block">+91 (123) 456-7890</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mr-4">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">Email</p>
                      <a href="mailto:hello@dermatclinic.demo" className="text-text-secondary text-sm mt-1 hover:text-primary transition-colors block">hello@dermatclinic.demo</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mr-4">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">Hours</p>
                      <p className="text-text-secondary text-sm mt-1">Mon-Sat: 9:00 AM - 6:00 PM<br/>Sun: Closed</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-surface p-8 rounded-3xl shadow-sm border border-border">
                <h3 className="text-2xl font-bold text-text-primary mb-2">Send us a message</h3>
                <p className="text-text-secondary mb-8">We would love to hear from you. Fill out the form below and we will get back to you shortly.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      required 
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="4" 
                      required 
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <Button type="submit" fullWidth size="lg" isLoading={isSubmitting}>
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

          </div>
          
          {/* Map Preview */}
          <div className="mt-12 max-w-3xl mx-auto">
            <h4 className="text-xl font-bold text-text-primary mb-4 text-center">Dermat Clinic Location</h4>
            <a 
              href="https://maps.google.com/?q=New+Delhi,+India" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block rounded-2xl overflow-hidden shadow-sm border border-border relative group h-48 sm:h-64 cursor-pointer"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114827184465!2d77.209021!3d28.613939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dermat Clinic Location"
                className="pointer-events-none"
              ></iframe>
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 bg-surface px-6 py-2 rounded-full font-medium text-primary shadow-lg transition-all duration-300 transform scale-95 group-hover:scale-100">
                  Open in Google Maps
                </div>
              </div>
            </a>
          </div>
          
        </div>
      </section>
    </>
  );
};
