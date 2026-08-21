import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SectionHeading } from '../components/SectionHeading';
import { Info } from 'lucide-react';

export const BeforeAfter = () => {
  // Mock data for before/after demo
  const cases = [
    {
      id: 1,
      category: 'Acne Treatment',
      description: 'Results after 4 months of clinical acne management.',
      before: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400&h=400',
      after: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400&h=400'
    },
    {
      id: 2,
      category: 'Pigmentation (Melasma)',
      description: 'Visible reduction in melasma after 3 sessions of chemical peels.',
      before: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=400&h=400',
      after: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400'
    },
    {
      id: 3,
      category: 'Anti-Aging & Skin Rejuvenation',
      description: 'Smoother texture and reduced fine lines after laser therapy.',
      before: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400',
      after: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Before & After | Dermat Clinic</title>
        <meta name="description" content="View our gallery of before and after treatment results." />
      </Helmet>

      <section className="py-20 bg-background min-h-[calc(100vh-200px)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading 
            title="Real Results" 
            subtitle="Before & After Gallery"
            centered
          />

          <div className="bg-warning/10 p-4 rounded-xl border border-warning/20 flex items-start mb-12 max-w-4xl mx-auto">
            <Info className="w-5 h-5 text-warning shrink-0 mt-0.5 mr-3" />
            <p className="text-sm text-warning-800 dark:text-warning-200 leading-relaxed">
              <strong>Medical Disclaimer:</strong> Images shown are for educational and demo purposes only and do not guarantee specific treatment outcomes. Individual results may vary depending on skin type, condition severity, and adherence to the prescribed regimen.
            </p>
          </div>

          <div className="space-y-16 max-w-5xl mx-auto">
            {cases.map((c) => (
              <div key={c.id} className="bg-surface rounded-3xl p-6 md:p-8 shadow-sm border border-border">
                <div className="mb-6 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-text-primary">{c.category}</h3>
                  <p className="text-text-secondary">{c.description}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 relative">
                  {/* Decorative divider for desktop */}
                  <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
                  
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100">
                    <img src={c.before} alt="Before treatment" className="w-full h-full object-cover filter grayscale sepia-[0.3]" />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Before
                    </div>
                  </div>
                  
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100">
                    <img src={c.after} alt="After treatment" className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-success/80 backdrop-blur text-white px-3 py-1 rounded-full text-sm font-semibold">
                      After
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};
