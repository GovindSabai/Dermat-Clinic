import React from 'react';

export const Badge = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary text-primary',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    gray: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
