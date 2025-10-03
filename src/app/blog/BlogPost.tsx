'use client';

import React, { useState, useEffect } from 'react';
import { BlogPost as BlogPostType } from './blogData';

interface BlogPostProps {
  post: BlogPostType;
  onBack: () => void;
}

export const BlogPost: React.FC<BlogPostProps> = ({ post, onBack }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = (window.scrollY / documentHeight) * 100;
      setReadingProgress(scrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <article className="max-w-4xl mx-auto px-6 py-16 relative z-10">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-100 z-50">
        <div 
          className="h-full bg-slate-900 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-8 transition-colors group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Back to all posts
      </button>
      
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-12 text-white">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              {post.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
            <div className="flex items-center gap-6 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  HP
                </span>
                <span>S Hari Preetham</span>
              </div>
              <span>•</span>
              <span className="font-mono">{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-12">
          <div className="prose prose-lg prose-slate max-w-none">
            {post.content.split('\n').map((line, idx) => {
              if (line.startsWith('# ')) {
                return <h1 key={idx} className="text-4xl font-bold mt-12 mb-6 text-slate-900 border-b border-slate-200 pb-4">{line.slice(2)}</h1>;
              }
              if (line.startsWith('## ')) {
                return <h2 key={idx} className="text-3xl font-semibold mt-10 mb-4 text-slate-900">{line.slice(3)}</h2>;
              }
              if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={idx} className="font-bold mt-6 mb-3 text-slate-900 text-lg">{line.slice(2, -2)}</p>;
              }
              if (line.trim().startsWith('-')) {
                return (
                  <li key={idx} className="text-slate-700 ml-6 my-2 leading-relaxed">
                    {line.slice(1).trim()}
                  </li>
                );
              }
              if (line.trim() === '') {
                return <div key={idx} className="h-6"></div>;
              }
              if (line.includes('```')) {
                return null;
              }
              if (line.trim().length > 0) {
                return <p key={idx} className="text-slate-700 leading-relaxed mb-6 text-lg">{line}</p>;
              }
              return null;
            })}
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t border-slate-200 p-12 bg-slate-50">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <p className="text-sm text-slate-600 mb-2">Share this article</p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-100 transition-colors">
                  Twitter
                </button>
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-100 transition-colors">
                  LinkedIn
                </button>
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-100 transition-colors">
                  Copy Link
                </button>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-slate-600 mb-2">Tags</p>
              <div className="flex gap-2">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-sm rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Next/Previous Navigation */}
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all cursor-pointer">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">← Previous Post</p>
          <p className="font-semibold text-slate-900">Building Hardware That Works</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all cursor-pointer">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Next Post →</p>
          <p className="font-semibold text-slate-900">System Identification for Control</p>
        </div>
      </div>
    </article>
  );
};