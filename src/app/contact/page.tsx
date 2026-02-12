"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import axios from "axios";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters long"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const {
    register,
    handleSubmit: handleFormSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/contact", data);

      if (response.status === 200) {
        setSubmitStatus("success");
        toast.success("Message sent successfully!");
        reset();
        setIsSubmitting(false);
        setTimeout(() => {
          setSubmitStatus("idle");
        }, 5000);
      } else {
        setSubmitStatus("error");
        setIsSubmitting(false);
        toast.error("Failed to send message!");
      }
    } catch (error) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      toast.error("Failed to send message!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-50 via-white to-blue-50 dark:from-black dark:via-zinc-900 dark:to-blue-950">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
                📧 Get In Touch
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Contact Us
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We'd love to hear from you. Send us a message!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="order-2 md:order-1">
              <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">
                  Send us a message
                </h2>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 rounded-lg bg-green-100 dark:bg-green-900/30 border border-green-500 dark:border-green-500/50">
                    <p className="text-green-700 dark:text-green-400 font-medium">
                      ✓ Message sent successfully! We'll get back to you soon.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-500 dark:border-red-500/50">
                    <p className="text-red-700 dark:text-red-400 font-medium">
                      ✗ Failed to send message! Please try again.
                    </p>
                  </div>
                )}

                <form
                  onSubmit={handleFormSubmit(handleSubmit)}
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      {...register("subject")}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      {...register("message")}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group relative px-8 py-4 bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span className="absolute inset-0 rounded-lg bg-linear-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </span>
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="order-1 md:order-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">
                  Contact Information
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                  Have questions? We're here to help. Reach out through any of
                  these channels.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: "📍",
                    title: "Visit Us",
                    content: "123 Blog Street, San Francisco, CA 94102",
                  },
                  {
                    icon: "📧",
                    title: "Email Us",
                    content: "elangovan2019miss@gmail.com",
                  },
                  {
                    icon: "📞",
                    title: "Call Us",
                    content: "+91 6383479344",
                  },
                  {
                    icon: "🕐",
                    title: "Working Hours",
                    content: "Mon - Fri: 9:00 AM - 6:00 PM PST",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{item.icon}</div>
                      <div>
                        <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="pt-8">
                <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-white">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  {[
                    { icon: "𝕏", label: "Twitter", color: "hover:bg-blue-500" },
                    {
                      icon: "in",
                      label: "LinkedIn",
                      color: "hover:bg-blue-700",
                    },
                    {
                      icon: "f",
                      label: "Facebook",
                      color: "hover:bg-blue-600",
                    },
                    {
                      icon: "📷",
                      label: "Instagram",
                      color: "hover:bg-pink-600",
                    },
                  ].map((social, index) => (
                    <button
                      key={index}
                      className={`w-12 h-12 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold flex items-center justify-center transition-all duration-300 hover:text-white hover:scale-110 hover:shadow-lg ${social.color}`}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-zinc-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-zinc-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                question: "How quickly will I receive a response?",
                answer:
                  "We typically respond to all inquiries within 24 hours during business days.",
              },
              {
                question: "Can I schedule a call with your team?",
                answer:
                  "Absolutely! Mention your preferred time in the message, and we'll coordinate a call.",
              },
              {
                question: "Do you offer technical support?",
                answer:
                  "Yes, our technical support team is available to help with any platform-related issues.",
              },
              {
                question: "How can I report a bug or issue?",
                answer:
                  "Please use the contact form above with 'Bug Report' as the subject, and describe the issue in detail.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-white">
                  {faq.question}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section (Decorative) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative h-96 rounded-3xl overflow-hidden bg-linear-to-br from-blue-500 to-purple-600 p-1">
            <div className="w-full h-full rounded-3xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-6xl">🗺️</div>
                <p className="text-xl font-semibold text-zinc-900 dark:text-white">
                  Find Us Here
                </p>
                <p className="text-zinc-600 dark:text-zinc-400">
                  San Francisco, California
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
