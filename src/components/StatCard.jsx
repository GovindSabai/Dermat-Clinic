import React from 'react';
import { motion } from 'framer-motion';

export const StatCard = ({ title, value, suffix = '+' }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-surface rounded-2xl p-6 text-center shadow-sm border border-border"
    >
      <div className="text-3xl md:text-4xl font-bold text-primary mb-2 flex items-center justify-center">
        {value}
        <span className="text-secondary ml-1">{suffix}</span>
      </div>
      <p className="text-sm text-text-secondary font-medium uppercase tracking-wide">
        {title}
      </p>
    </motion.div>
  );
};
