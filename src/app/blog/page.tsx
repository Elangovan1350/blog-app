"use client";

import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import axios from "axios";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  readTime: string;

  createdAt: string;
  updatedAt: string;
}

export default function BlogPage() {
  const {
    data: blogsPosts,
    isLoading,
    error,
  } = useSWR("/api/blogs", async () => {
    const res = await axios.get("/api/blogs");
    return res.data as BlogPost[];
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-600 dark:text-red-400">
          Error: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-50 via-white to-blue-50 dark:from-zinc-950 dark:via-black dark:to-blue-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-block">
              <span className="inline-block px-4 py-2 rounded-full bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium">
                📚 Our Blog
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Latest Articles
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Insights, tutorials, and stories about web development, design,
              and technology
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogsPosts?.map((post: BlogPost) => (
              <article
                key={post.id}
                className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg shadow-black/5 dark:shadow-white/5 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-linear-to-br from-blue-500 to-purple-600">
                  <Link
                    href={`/blog/${post.id}`}
                    className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10"
                  >
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {post.category}
                      </span>
                    </div>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex flex-col h-auto justify-between">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <Link href={`/blog/${post.id}`}>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>

                  {/* Excerpt */}
                  <Link href={`/blog/${post.id}`}>
                    <p className="text-sm text-zinc-600 line-clamp-2 dark:text-zinc-400">
                      {post.excerpt}
                    </p>
                  </Link>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-400"
                      >
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Author & Read More */}
                  <div className="flex items-center justify-end pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all duration-300"
                    >
                      Read
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
