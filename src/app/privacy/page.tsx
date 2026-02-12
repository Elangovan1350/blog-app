import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-50 via-white to-blue-50 dark:from-black dark:via-zinc-900 dark:to-blue-950">
      {/* Header */}
      <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
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
                <Shield size={16} />
                Privacy Policy
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
              Privacy{" "}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              Last updated: February 12, 2026
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 md:p-12 shadow-xl shadow-black/5 dark:shadow-white/5">
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
                Information We Collect
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                We collect information you provide directly to us, such as when
                you create an account, publish a blog post, or contact us for
                support.
              </p>

              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 mt-8">
                How We Use Your Information
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                We use the information we collect to provide, maintain, and
                improve our services, to communicate with you, and to protect
                BlogApp and our users.
              </p>

              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 mt-8">
                Information Sharing
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                We do not share your personal information with third parties
                except as described in this policy or with your consent.
              </p>

              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 mt-8">
                Data Security
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                We take reasonable measures to help protect your personal
                information from loss, theft, misuse, and unauthorized access.
              </p>

              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 mt-8">
                Contact Us
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <a
                  href={`mailto:${process.env.EMAIL_USER}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {process.env.EMAIL_USER}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
