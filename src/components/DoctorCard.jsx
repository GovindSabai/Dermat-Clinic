import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Badge } from './Badge';

export const DoctorCard = ({ doctor }) => {
  return (
    <Link to={`/doctors/${doctor.slug}`} className="bg-surface rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full group cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={doctor.photo}
          alt={doctor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="primary" className="backdrop-blur-md bg-surface/90">
            {doctor.experience}
          </Badge>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-2">
          <h3 className="text-xl font-bold text-text-primary mb-1">{doctor.name}</h3>
          <p className="text-primary font-medium text-sm">{doctor.designation}</p>
        </div>
        
        <p className="text-text-secondary text-sm mb-4 line-clamp-2 flex-grow">
          {doctor.qualifications}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {doctor.specializations.slice(0, 2).map((spec, index) => (
            <Badge key={index} variant="gray">
              {spec}
            </Badge>
          ))}
          {doctor.specializations.length > 2 && (
            <Badge variant="gray">+{doctor.specializations.length - 2}</Badge>
          )}
        </div>

        <div
          className="inline-flex items-center justify-between w-full text-primary font-medium group-hover:text-primary-dark transition-colors"
        >
          <span>View Profile</span>
          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};
