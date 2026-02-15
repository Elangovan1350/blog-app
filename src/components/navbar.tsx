"use client";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const container = useRef(null);
  const iconRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const isFirstRender = useRef(true);

  const tl = useRef<GSAPTimeline>(null);
  const handleToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useGSAP(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      if (isMobileMenuOpen) {
        // OPENING ANIMATION
        tl.current = gsap
          .timeline({ defaults: { ease: "power2.out" } })
          .to(iconRef.current, {
            rotate: 360,
            duration: 0.3,
          })
          .fromTo(
            mobileMenuRef.current,
            { height: 0, opacity: 0 },
            {
              height: "auto",
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
            },
            "<",
          )
          .fromTo(
            ".navlinks",
            { y: -10, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.3 },
            "-=0.2",
          );
      }

      if (!isMobileMenuOpen) {
        // CLOSING ANIMATION
        tl.current = gsap
          .timeline({ defaults: { ease: "power2.out" } })
          .to(iconRef.current, {
            rotate: -360,
            duration: 0.3,
          })
          .to(
            ".navlinks",
            {
              opacity: 0,
              y: -10,
              duration: 0.2,
              ease: "power2.in",
              stagger: 0.1,
            },
            "<",
          )
          .fromTo(
            mobileMenuRef.current,
            { height: 288.8, opacity: 1 },
            { height: 0, opacity: 0, duration: 0.4, ease: "power2.in" },
          );
      }
    },
    {
      scope: container,
      dependencies: [isMobileMenuOpen],
      revertOnUpdate: true,
    },
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      ref={container}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-lg shadow-black/5 dark:shadow-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-linear-to-r from-blue-500 to-purple-600 text-white font-bold text-xl px-3 py-1.5 rounded-lg">
                B
              </div>
            </div>
            <span className="text-xl md:text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BlogApp
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/create-blog"
              className="relative group overflow-hidden px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300"
            >
              <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-600 transition-transform duration-300 group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative text-white flex items-center space-x-2">
                <span>Get Started</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={handleToggle}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <span ref={iconRef} className="text-zinc-800 dark:text-zinc-200">
              {isMobileMenuOpen ? (
                <X id="close" size={28} />
              ) : (
                <Menu id="open" size={24} />
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div ref={mobileMenuRef} className={`md:hidden h-0 overflow-hidden`}>
        <div className="px-4 pt-2 pb-6 space-y-1 bg-white/95 dark:bg-black/95 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="navlinks block px-4 py-3 text-base font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/create-blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="navlinks block text-blue-500 px-4 py-3  text-base font-medium hover:text-blue-600 dark:hover:text-blue-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg"
          >
            Create Blog
          </Link>
        </div>
      </div>
    </nav>
  );
}
