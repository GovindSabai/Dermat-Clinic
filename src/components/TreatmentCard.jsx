import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const TreatmentCard = ({ treatment }) => {
  return (
    <Link to={`/treatments/${treatment.slug}`} className="bg-surface rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow duration-300 group flex flex-col h-full cursor-pointer">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={treatment.image}
          alt={treatment.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <div className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wider">
          {treatment.category}
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-3">
          {treatment.title}
        </h3>
        <p className="text-text-secondary text-sm mb-5 line-clamp-2">
          {treatment.shortDescription}
        </p>
        
        <div className="inline-flex items-center text-primary font-medium group-hover:text-primary-dark transition-colors mt-auto">
          Learn More
          <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};
