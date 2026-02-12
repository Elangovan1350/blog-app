"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
} from "lucide-react";
import { toast } from "sonner";

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

export default function SingleBlogPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.id as string;

  // Fetch all blogs and find the one matching the slug
  const {
    data: blogsPosts,
    isLoading,
    error,
  } = useSWR("/api/blogs", async () => {
    const res = await axios.get("/api/blogs");
    return res.data as BlogPost[];
  });

  // Find the current blog post by converting title to slug
  const currentPost = blogsPosts?.find((post) => post.id === slug);

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogsPosts
    ?.filter(
      (post) =>
        post.category === currentPost?.category && post.id !== currentPost.id,
    )
    .slice(0, 3);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = currentPost?.title || "";

    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-linear-to-br from-zinc-50 via-white to-blue-50 dark:from-black dark:via-zinc-900 dark:to-blue-950">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="text-zinc-600 dark:text-zinc-400">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !currentPost) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-linear-to-br from-zinc-50 via-white to-blue-50 dark:from-black dark:via-zinc-900 dark:to-blue-950">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Article Not Found
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-50 via-white to-blue-50 dark:from-black dark:via-zinc-900 dark:to-blue-950">
      {/* Back Button */}
      <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            Back to all articles
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <article className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold">
              {currentPost.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight">
            {currentPost.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
            {currentPost.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-zinc-200 dark:border-zinc-800">
            {/* Date */}
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <Calendar size={18} />
              <span>
                {new Date(currentPost.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Read Time */}
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <Clock size={18} />
              <span>{currentPost.readTime}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-2xl shadow-black/10 dark:shadow-white/5">
            <Image
              src={currentPost.image}
              alt={currentPost.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <div className="text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-6">
              {currentPost.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-12">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4 uppercase tracking-wide">
              Tags
            </h3>
            <div className="flex flex-wrap gap-3">
              {currentPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 cursor-pointer"
                >
                  <Tag size={16} />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share Section */}
          <div className="mb-12 p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Share2
                  className="text-blue-600 dark:text-blue-400"
                  size={24}
                />
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Share this article
                </h3>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleShare("twitter")}
                  className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-500 dark:hover:bg-blue-500 text-zinc-600 dark:text-zinc-400 hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110"
                  aria-label="Share on Twitter"
                >
                  <Twitter size={18} />
                </button>
                <button
                  onClick={() => handleShare("facebook")}
                  className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-600 dark:hover:bg-blue-600 text-zinc-600 dark:text-zinc-400 hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={18} />
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-700 dark:hover:bg-blue-700 text-zinc-600 dark:text-zinc-400 hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin size={18} />
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-purple-600 dark:hover:bg-purple-600 text-zinc-600 dark:text-zinc-400 hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110"
                  aria-label="Copy link"
                >
                  <Link2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="bg-white/50 dark:bg-zinc-900/50 py-16 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="group"
                  >
                    <article className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm text-xs font-semibold text-blue-600 dark:text-blue-400">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 mt-4 text-xs text-zinc-500 dark:text-zinc-400">
                          <Clock size={14} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
