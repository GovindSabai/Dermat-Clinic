import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SectionHeading } from '../components/SectionHeading';
import { team } from '../data/team';

const TeamCard = ({ member }) => (
  <div className="bg-surface rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 group">
    <div className="aspect-[4/5] relative overflow-hidden">
      <img
        src={member.photo}
        alt={member.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <div className="p-6 text-center transform group-hover:-translate-y-2 transition-transform duration-300 relative bg-surface">
      <h3 className="text-xl font-bold text-text-primary mb-1">{member.name}</h3>
      <p className="text-primary font-medium">{member.role}</p>
    </div>
  </div>
);

export const OurTeam = () => {
  // Group team members by category
  const groupedTeam = team.reduce((acc, member) => {
    if (!acc[member.category]) {
      acc[member.category] = [];
    }
    acc[member.category].push(member);
    return acc;
  }, {});

  return (
    <>
      <Helmet>
        <title>Our Team | Dermat Clinic</title>
        <meta name="description" content="Meet the dedicated team of dermatologists and clinical staff at Dermat Clinic." />
      </Helmet>

      {/* Hero */}
      <section className="bg-surface border-b border-border py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionHeading 
            title="Our Team" 
            subtitle="The People Behind Your Care"
            centered
          />
          <p className="text-xl text-text-secondary leading-relaxed">
            Behind every great patient experience is a team that cares. Our clinic is supported by highly trained specialists and compassionate staff dedicated to your skin health.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {Object.entries(groupedTeam).map(([category, members]) => (
            <div key={category} className="mb-20 last:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-8 border-b border-border pb-4">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {members.map(member => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          ))}

        </div>
      </section>
    </>
  );
};
