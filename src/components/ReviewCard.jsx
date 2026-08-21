import React from 'react';
import { Star, Quote } from 'lucide-react';

export const ReviewCard = ({ review }) => {
  return (
    <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm flex flex-col h-full relative">
      <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />
      
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating ? 'text-warning fill-warning' : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
      
      <p className="text-text-primary text-sm italic mb-6 flex-grow leading-relaxed">
        "{review.quote}"
      </p>
      
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3">
          {review.patientName.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">{review.patientName}</p>
        </div>
      </div>
    </div>
  );
};
