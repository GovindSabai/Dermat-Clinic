import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplet, Sun, Scissors, Activity, Heart, Sparkles } from 'lucide-react';

// Simple icon map for demo purposes
const iconMap = {
  Droplet: Droplet,
  Sun: Sun,
  Scissors: Scissors,
  Activity: Activity,
  Heart: Heart,
  Sparkles: Sparkles,
};

export const ConditionCard = ({ condition }) => {
  const Icon = iconMap[condition.icon] || Heart;

  return (
    <Link 
      to={`/conditions/${condition.slug}`}
      className="block group h-full"
    >
      <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
          <Icon className="w-6 h-6" />
        </div>
        
        <h3 className="text-lg font-bold text-text-primary mb-2">
          {condition.title}
        </h3>
        
        <p className="text-text-secondary text-sm mb-4 flex-grow line-clamp-2">
          {condition.shortDescription}
        </p>
        
        <div className="flex items-center text-primary text-sm font-medium mt-auto group-hover:text-primary-dark transition-colors">
          Learn More
          <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};
