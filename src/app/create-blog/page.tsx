"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import useSWR from "swr";
import {
  PenTool,
  Image as ImageIcon,
  Tag,
  User,
  Clock,
  Sparkles,
  X,
  ArrowLeft,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

// Form validation schema
const blogSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(200, "Title must not exceed 200 characters"),
  excerpt: z
    .string()
    .min(50, "Excerpt must be at least 50 characters")
    .max(300, "Excerpt must not exceed 300 characters"),
  content: z.string().min(200, "Content must be at least 200 characters"),
  image: z.string().url("Please enter a valid image URL"),
  category: z.string().min(1, "Please select a category"),
  tags: z
    .array(z.object({ value: z.string() }))
    .min(1, "Add at least one tag")
    .max(5, "Maximum 5 tags allowed"),
});

type BlogFormData = z.infer<typeof blogSchema>;

interface User {
  id: string;
  name: string;
  email: string;
}

const categories = [
  "Technology",
  "Design",
  "Business",
  "Lifestyle",
  "Travel",
  "Food",
  "Health",
  "Education",
  "Entertainment",
  "Other",
];

export default function CreateBlogPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      image: "",
      category: "",
      tags: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  const watchTitle = watch("title", "");
  const watchExcerpt = watch("excerpt", "");
  const watchContent = watch("content", "");
  const watchImage = watch("image", "");

  // Calculate read time based on content (average reading speed: 200 words/min)
  const calculateReadTime = (content: string) => {
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  const handleAddTag = () => {
    const value = tagInput.trim();
    if (!value) return;
    if (fields.length >= 5) return;

    append({ value });
    setTagInput("");
  };

  const onSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    try {
      const readTime = calculateReadTime(data.content);
      const tags = data.tags.map((tag) => tag.value);

      const blogData = {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        image: data.image,
        category: data.category,
        tags,
        readTime,
      };

      const response = await axios.post("/api/blogs", blogData);

      if (response.status === 201) {
        toast.success("Blog post created successfully!");
        router.push(`/blog/${response.data.id}`);
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
      toast.error("Failed to create blog post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-50 via-white to-blue-50 dark:from-black dark:via-zinc-900 dark:to-blue-950">
      {/* Header */}
      <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group mb-8"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            Back to home
          </Link>

          <div className="text-center space-y-4 mb-12">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-2">
                <Sparkles size={16} />
                Create Your Story
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
              Share Your{" "}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Thoughts
              </span>
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Craft a beautiful blog post and share it with the world
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Main Content Card */}
            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-xl shadow-black/5 dark:shadow-white/5">
              {/* Title */}
              <div className="mb-8">
                <label className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white mb-3">
                  <PenTool size={18} className="text-blue-600" />
                  Title
                  <span className="text-zinc-400 text-xs font-normal ml-auto">
                    {watchTitle.length}/200
                  </span>
                </label>
                <input
                  {...register("title")}
                  type="text"
                  placeholder="Enter an engaging title for your blog post..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Excerpt */}
              <div className="mb-8">
                <label className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white mb-3">
                  <Sparkles size={18} className="text-purple-600" />
                  Excerpt
                  <span className="text-zinc-400 text-xs font-normal ml-auto">
                    {watchExcerpt.length}/300
                  </span>
                </label>
                <textarea
                  {...register("excerpt")}
                  rows={3}
                  placeholder="Write a brief description that captures the essence of your post..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                />
                {errors.excerpt && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.excerpt.message}
                  </p>
                )}
              </div>

              {/* Content */}
              <div className="mb-8">
                <label className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white mb-3">
                  <PenTool size={18} className="text-blue-600" />
                  Content
                  <span className="text-zinc-400 text-xs font-normal ml-auto">
                    {watchContent.length}/3000 ||{" "}
                    {calculateReadTime(watchContent)}
                  </span>
                </label>
                <textarea
                  {...register("content")}
                  rows={12}
                  placeholder="Write your amazing content here... Share your insights, stories, and ideas with the world."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                />
                {errors.content && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.content.message}
                  </p>
                )}
              </div>

              {/* Image URL */}
              <div className="mb-8">
                <label className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white mb-3">
                  <ImageIcon size={18} className="text-green-600" />
                  Featured Image URL
                </label>
                <input
                  {...register("image")}
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
                {errors.image && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.image.message}
                  </p>
                )}
                {watchImage && !errors.image && (
                  <div className="mt-4 relative h-64 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700">
                    <Image
                      src={watchImage}
                      alt="Preview"
                      width={500}
                      height={500}
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Category & Author Row */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Category */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white mb-3">
                    <Tag size={18} className="text-orange-600" />
                    Category
                  </label>
                  <select
                    {...register("category")}
                    className="w-full px-6 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white mb-3">
                  <Tag size={18} className="text-pink-600" />
                  Tags
                  <span className="text-zinc-400 text-xs font-normal">
                    ({fields.length}/5)
                  </span>
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="Add a tag and press Enter"
                    disabled={fields.length >= 5}
                    className="flex-1 px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  />

                  <button
                    type="button"
                    onClick={handleAddTag}
                    disabled={fields.length >= 5}
                    className="px-6 py-3 rounded-xl bg-linear-to-r from-pink-500 to-rose-600 text-white font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                </div>
                {fields.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {fields.map((field, index) => (
                      <span
                        key={field.id}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 font-medium"
                      >
                        {field.value}
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="hover:bg-pink-200 dark:hover:bg-pink-800 rounded-full p-0.5 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                {errors.tags && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.tags.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative px-8 py-4 bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="absolute inset-0 rounded-full bg-linear-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Publish Blog Post
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
