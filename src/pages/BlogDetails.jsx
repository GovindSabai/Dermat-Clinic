import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blog';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Badge } from '../components/Badge';

export const BlogDetails = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Dermat Clinic Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <article className="py-20 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary-dark font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left side: Image */}
            <div className="rounded-3xl overflow-hidden shadow-lg sticky top-24">
              <img src={post.image} alt={post.title} className="w-full h-auto object-cover aspect-[4/3] lg:aspect-square" />
            </div>

            {/* Right side: Content */}
            <div>
              <header className="mb-10">
                <Badge variant="secondary" className="mb-4">{post.category}</Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center text-text-secondary text-sm gap-4">
                  <span className="flex items-center"><User className="w-4 h-4 mr-2" /> By {post.author}</span>
                  <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {post.date}</span>
                </div>
              </header>

              <div className="prose prose-lg dark:prose-invert max-w-none text-text-secondary leading-relaxed space-y-6">
                <p className="text-xl font-medium text-text-primary leading-relaxed border-l-4 border-primary pl-4 mb-8">
                  {post.excerpt}
                </p>
                {/* Split simple content by double line break for paragraphs */}
                {post.content.split('. ').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}.</p>
                ))}
              </div>
            </div>
          </div>

        </div>
      </article>
    </>
  );
};
