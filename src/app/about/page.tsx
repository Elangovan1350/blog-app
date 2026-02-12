import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-50 via-white to-purple-50 dark:from-black dark:via-zinc-900 dark:to-purple-950">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium">
                👋 About Us
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-linear-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                Our Story
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Empowering voices, one story at a time
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
                Our Mission
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                We believe everyone has a story worth sharing. BlogApp was
                created to provide a platform where writers, creators, and
                thinkers can express themselves freely and beautifully.
              </p>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Our mission is to make blogging accessible, enjoyable, and
                impactful for everyone—from seasoned writers to those just
                starting their journey.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-linear-to-br from-purple-500 to-blue-600 p-1">
                <div className="w-full h-full rounded-3xl bg-white dark:bg-zinc-900 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="text-6xl">🎯</div>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                      Empowering Creators
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-zinc-900 dark:text-white">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "💡",
                title: "Innovation",
                description:
                  "Constantly evolving to provide the best blogging experience with cutting-edge technology",
              },
              {
                icon: "🤝",
                title: "Community",
                description:
                  "Building a supportive network where creators inspire and learn from each other",
              },
              {
                icon: "🎨",
                title: "Creativity",
                description:
                  "Celebrating unique voices and diverse perspectives from around the world",
              },
              {
                icon: "🔒",
                title: "Privacy",
                description:
                  "Protecting your data and giving you full control over your content",
              },
              {
                icon: "⚡",
                title: "Performance",
                description:
                  "Delivering lightning-fast experiences that keep readers engaged",
              },
              {
                icon: "🌍",
                title: "Accessibility",
                description:
                  "Making blogging accessible to everyone, regardless of technical skill",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-900 dark:text-white">
              Meet The Team
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Passionate individuals dedicated to your success
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Founder & CEO",
                emoji: "👨‍💼",
                bio: "Visionary leader with 10+ years in tech",
              },
              {
                name: "Sarah Chen",
                role: "Head of Design",
                emoji: "👩‍🎨",
                bio: "Creating beautiful experiences since 2015",
              },
              {
                name: "Michael Park",
                role: "Lead Developer",
                emoji: "👨‍💻",
                bio: "Building scalable solutions with passion",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="group text-center p-8 rounded-2xl bg-linear-to-br from-white to-purple-50 dark:from-zinc-900 dark:to-purple-950/30 border border-zinc-200 dark:border-zinc-800 hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-2"
              >
                <div className="text-7xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {member.emoji}
                </div>
                <h3 className="text-xl font-bold mb-1 text-zinc-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-purple-600 dark:text-purple-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Active Writers" },
              { number: "50K+", label: "Blog Posts" },
              { number: "1M+", label: "Monthly Readers" },
              { number: "150+", label: "Countries" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-linear-to-br from-purple-500 to-blue-600 text-white hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-purple-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-12 rounded-3xl bg-linear-to-r from-purple-500 to-blue-600 overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Join Our Community
              </h2>
              <p className="text-purple-100 text-lg mb-8">
                Be part of a growing community of passionate writers and
                creators
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/create-blog"
                  className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  Start Writing Today
                </Link>
                <Link
                  href="/privacy"
                  className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
