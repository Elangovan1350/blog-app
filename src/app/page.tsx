export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-zinc-50 via-white to-blue-50 dark:from-black dark:via-zinc-900 dark:to-blue-950">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
                  ✨ Welcome to BlogApp
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Share Your Stories
                </span>
                <br />
                <span className="text-zinc-900 dark:text-white">
                  With The World
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-600 dark:text-zinc-400">
                Create, publish, and share your thoughts with a beautiful and
                modern blogging platform. Built with Next.js and designed for
                creators.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <button className="group relative px-8 py-4 bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
                  <span className="absolute inset-0 rounded-full bg-linear-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative">Start Writing</span>
                </button>
                <button className="px-8 py-4 border-2 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-semibold rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300">
                  Explore Blogs
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-zinc-900 dark:text-white">
              Why Choose BlogApp?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "✍️",
                  title: "Easy Writing",
                  description:
                    "Intuitive editor with markdown support for seamless content creation",
                },
                {
                  icon: "🎨",
                  title: "Beautiful Design",
                  description:
                    "Modern, responsive layouts that make your content shine",
                },
                {
                  icon: "🚀",
                  title: "Fast Performance",
                  description:
                    "Built with Next.js for lightning-fast page loads and SEO",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative p-12 rounded-3xl bg-linear-to-r from-blue-500 to-purple-600 overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/10"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-blue-100 text-lg mb-8">
                  Join thousands of writers sharing their stories today
                </p>
                <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-xl">
                  Get Started Free
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
