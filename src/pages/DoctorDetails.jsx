import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { doctors } from '../data/doctors';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { GraduationCap, Award, Clock, Calendar, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DoctorDetails = () => {
  const { slug } = useParams();
  const doctor = doctors.find(d => d.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!doctor) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{doctor.name} | Dermat Clinic</title>
        <meta name="description" content={`Profile of ${doctor.name}, ${doctor.designation} at Dermat Clinic.`} />
      </Helmet>

      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-6">
            <Link to="/our-team" className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Team
            </Link>
          </div>

          <div className="bg-surface rounded-3xl overflow-hidden shadow-sm border border-border">
            <div className="grid md:grid-cols-3">
              {/* Doctor Photo */}
              <div className="md:col-span-1 bg-gray-100">
                <img 
                  src={doctor.photo} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover aspect-square md:aspect-auto"
                />
              </div>

              {/* Doctor Info */}
              <div className="md:col-span-2 p-8 lg:p-12">
                <Badge variant="primary" className="mb-4">{doctor.experience}</Badge>
                <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-2">{doctor.name}</h1>
                <p className="text-xl text-primary font-medium mb-6">{doctor.designation}</p>

                <p className="text-text-secondary leading-relaxed mb-8">
                  {doctor.expertise}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <GraduationCap className="w-5 h-5 text-text-secondary mr-3 mt-0.5" />
                    <div>
                      <p className="font-semibold text-text-primary text-sm">Qualifications</p>
                      <p className="text-text-secondary">{doctor.qualifications}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Award className="w-5 h-5 text-text-secondary mr-3 mt-0.5" />
                    <div>
                      <p className="font-semibold text-text-primary text-sm">Specializations</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {doctor.specializations.map((spec, idx) => (
                          <Badge key={idx} variant="gray">{spec}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-text-secondary mr-3 mt-0.5" />
                    <div>
                      <p className="font-semibold text-text-primary text-sm">Available Days</p>
                      <p className="text-text-secondary">{doctor.availableDays}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-text-secondary mr-3 mt-0.5" />
                    <div>
                      <p className="font-semibold text-text-primary text-sm">Consultation Hours</p>
                      <p className="text-text-secondary">{doctor.hours}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <Button to="/appointment" size="lg">
                    Book Appointment with {doctor.name.split(' ')[1]}
                  </Button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};
