import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SectionHeading } from '../components/SectionHeading';
import { blogPosts } from '../data/blog';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Badge } from '../components/Badge';

export const BlogCard = ({ post }) => (
  <div className="bg-surface rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
    <Link to={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-4 left-4">
        <Badge variant="primary" className="backdrop-blur-md bg-surface/90">
          {post.category}
        </Badge>
      </div>
    </Link>
    
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center text-xs text-text-secondary mb-3 space-x-4">
        <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> {post.date}</span>
        <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1" /> {post.author}</span>
      </div>
      
      <h3 className="text-xl font-bold text-text-primary mb-3 leading-snug group-hover:text-primary transition-colors">
        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      
      <p className="text-text-secondary text-sm mb-6 flex-grow line-clamp-3">
        {post.excerpt}
      </p>
      
      <Link
        to={`/blog/${post.slug}`}
        className="inline-flex items-center text-primary font-medium group-hover:text-primary-dark transition-colors mt-auto"
      >
        Read Article
        <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  </div>
);

export const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog | Dermat Clinic</title>
        <meta name="description" content="Read our latest articles on skincare routines, condition management, and dermatology news." />
      </Helmet>

      <section className="py-20 bg-background min-h-[calc(100vh-200px)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Dermatology Insights" 
            subtitle="Our Blog"
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {blogPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
