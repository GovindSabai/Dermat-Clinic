import React from 'react';

export const SectionHeading = ({ title, subtitle, centered = false, className = '' }) => {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''} ${className}`}>
      {subtitle && (
        <span className="inline-block text-primary font-semibold text-sm tracking-wider uppercase mb-2">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
        {title}
      </h2>
    </div>
  );
};
