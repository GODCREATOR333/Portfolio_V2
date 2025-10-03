'use client';

import React from 'react';
import { BlogPost } from './blogData';

interface BlogListProps {
  posts: BlogPost[];
  onPostClick: (post: BlogPost) => void;
}

export const BlogList: React.FC<BlogListProps> = ({ posts, onPostClick }) => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 relative z-10">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-slate-900 mb-3">Technical Writing</h2>
        <p className="text-lg text-slate-600">Deep dives into robotics, control theory, and engineering challenges</p>
      </div>
      
      {/* Featured Post */}
      <div className="mb-12">
        <div 
          className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-10 text-white overflow-hidden relative group cursor-pointer"
          onClick={() => onPostClick(posts[0])}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-700 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium mb-4">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Featured Post
            </div>
            <h3 className="text-3xl font-bold mb-4 group-hover:text-slate-200 transition-colors">
              {posts[0].title}
            </h3>
            <p className="text-slate-300 mb-6 text-lg leading-relaxed">
              {posts[0].excerpt}
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <span className="font-mono">{posts[0].date}</span>
              <span>•</span>
              <span>{posts[0].readTime}</span>
              <span>•</span>
              <div className="flex gap-2">
                {posts[0].tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 bg-white/10 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 text-white font-medium group-hover:gap-3 transition-all">
              Read Article
              <span>→</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Other Posts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {posts.slice(1).map((post) => (
          <article 
            key={post.id} 
            className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            onClick={() => onPostClick(post)}
          >
            <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                {post.tags[0] === 'ROS2' ? '🤖' : post.tags[0] === 'Control Theory' ? '📈' : '⚙️'}
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-mono text-slate-700">
                {post.readTime}
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-xs font-mono text-slate-500 mb-3">{post.date}</p>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 bg-slate-50 text-slate-600 text-xs rounded border border-slate-200">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-2 text-sm font-medium text-slate-900 group-hover:gap-3 transition-all">
                Read more
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {/* CTA */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600">
          <span>📝</span>
          More posts coming soon - currently documenting laser weeding system development
        </div>
      </div>
    </section>
  );
};