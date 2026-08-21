import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  to,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary: 'bg-secondary text-primary hover:bg-opacity-80 focus:ring-secondary',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
    ghost: 'text-primary hover:bg-secondary/20 focus:ring-primary',
    link: 'text-primary hover:underline hover:text-primary-dark p-0 focus:ring-0',
  };

  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-5 py-2.5',
    lg: 'text-lg px-8 py-3.5',
  };

  const classes = `${baseStyles} ${variants[variant]} ${variant !== 'link' ? sizes[size] : ''} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={isLoading} {...props}>
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
};
