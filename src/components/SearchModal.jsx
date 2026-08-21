import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { conditions } from '../data/conditions';
import { treatments } from '../data/treatments';
import { doctors } from '../data/doctors';
import { blogPosts } from '../data/blog';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({});
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    } else {
      setQuery('');
      setResults({});
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({});
      return;
    }

    const lowercaseQuery = query.toLowerCase();

    const matchedConditions = conditions.filter(c => 
      c.title.toLowerCase().includes(lowercaseQuery) || 
      c.shortDescription.toLowerCase().includes(lowercaseQuery)
    ).map(c => ({ title: c.title, path: `/conditions/${c.slug}` }));

    const matchedTreatments = treatments.filter(t => 
      t.title.toLowerCase().includes(lowercaseQuery) || 
      t.shortDescription.toLowerCase().includes(lowercaseQuery)
    ).map(t => ({ title: t.title, path: `/treatments/${t.slug}` }));

    const matchedDoctors = doctors.filter(d => 
      d.name.toLowerCase().includes(lowercaseQuery) || 
      d.specializations.some(s => s.toLowerCase().includes(lowercaseQuery))
    ).map(d => ({ title: d.name, path: `/doctors/${d.slug}` }));

    const matchedBlogs = blogPosts.filter(b => 
      b.title.toLowerCase().includes(lowercaseQuery) || 
      b.category.toLowerCase().includes(lowercaseQuery)
    ).map(b => ({ title: b.title, path: `/blog/${b.slug}` }));

    setResults({
      'Conditions': matchedConditions,
      'Treatments': matchedTreatments,
      'Doctors': matchedDoctors,
      'Blog': matchedBlogs
    });
  }, [query]);

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const hasResults = Object.values(results).some(arr => arr.length > 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed z-[70] inset-x-4 top-20 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:top-24 md:w-full md:max-w-2xl bg-surface rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="flex items-center px-4 py-4 border-b border-border">
              <Search className="w-5 h-5 text-text-secondary mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search treatments, conditions, doctors..."
                className="flex-grow bg-transparent border-none outline-none text-text-primary placeholder-text-secondary text-lg"
              />
              <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            <div className="overflow-y-auto flex-grow bg-background">
              {query.trim() && !hasResults && (
                <div className="p-8 text-center text-text-secondary">
                  No results found for "{query}"
                </div>
              )}

              {hasResults && (
                <div className="p-4 space-y-6">
                  {Object.entries(results).map(([category, items]) => {
                    if (items.length === 0) return null;
                    return (
                      <div key={category}>
                        <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-2 px-2">
                          {category}
                        </h3>
                        <ul className="space-y-1">
                          {items.map((item, idx) => (
                            <li key={idx}>
                              <button
                                onClick={() => handleNavigate(item.path)}
                                className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg hover:bg-surface border border-transparent hover:border-border transition-colors group"
                              >
                                <span className="text-text-primary text-sm font-medium">{item.title}</span>
                                <ChevronRight className="w-4 h-4 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
