import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <div className="bg-linear-to-r from-blue-500 to-purple-600 text-white font-bold text-sm px-2 py-1 rounded">
              B
            </div>
            <span className="text-sm font-semibold text-zinc-900 dark:text-white">
              BlogApp
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6">
            <Link
              href="/about"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Privacy
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            © {currentYear} BlogApp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
