'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <span className="font-display font-semibold text-sage-700 text-lg">Plantnet</span>
        </div>
        <Link
          href="/identify"
          className="text-sm font-body text-sage-600 hover:text-sage-800 transition-colors border border-sage-300 rounded-full px-4 py-1.5 hover:border-sage-500"
        >
          Try it free
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 text-center py-16 md:py-24">
        {/* Floating botanical elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <span className="absolute top-24 left-12 text-5xl opacity-10 animate-float" style={{animationDelay: '0s'}}>🌸</span>
          <span className="absolute top-40 right-16 text-4xl opacity-10 animate-float" style={{animationDelay: '1s'}}>🌿</span>
          <span className="absolute bottom-32 left-20 text-6xl opacity-10 animate-float" style={{animationDelay: '2s'}}>🍃</span>
          <span className="absolute bottom-40 right-12 text-5xl opacity-10 animate-float" style={{animationDelay: '0.5s'}}>🌺</span>
          <span className="absolute top-60 left-1/4 text-3xl opacity-10 animate-float" style={{animationDelay: '1.5s'}}>🌻</span>
          <span className="absolute top-32 right-1/3 text-4xl opacity-8 animate-float" style={{animationDelay: '2.5s'}}>🌱</span>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-sage-100 text-sage-700 text-sm font-body px-4 py-1.5 rounded-full mb-8 border border-sage-200 slide-up">
          <span className="w-2 h-2 rounded-full bg-sage-500 animate-pulse-slow"></span>
          XC-Powered Botanical Intelligence
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl md:text-7xl font-bold text-moss-900 leading-tight mb-6 max-w-4xl slide-up slide-up-delay-1">
          Discover the Story
          <span className="block italic text-sage-600"> Behind Every Plant</span>
        </h1>

        {/* Subtext */}
        <p className="font-body text-lg md:text-xl text-moss-600 max-w-2xl mb-10 leading-relaxed slide-up slide-up-delay-2">
          Upload a photo and uncover its origins, habitat, cultural significance,
          and the rich story woven into every leaf and petal.
        </p>

        {/* CTA */}
        <Link
          href="/identify"
          className="btn-primary inline-flex items-center gap-3 bg-sage-600 hover:bg-sage-700 text-white font-body font-semibold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 slide-up slide-up-delay-3"
        >
          <span className="text-xl">🔍</span>
          Identify a Plant
        </Link>

        <p className="mt-4 text-sm text-moss-400 font-body slide-up slide-up-delay-4">
          No account needed · Instant results · 10,000+ species
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-20 max-w-4xl w-full slide-up slide-up-delay-5">
          {[
            {
              icon: '🔬',
              title: 'Precise Identification',
              desc: 'AI vision analyzes leaf patterns, color, shape and texture to identify with confidence.',
            },
            {
              icon: '🗺️',
              title: 'Geographic Origins',
              desc: 'Discover where your plant comes from, its native climate zone, and natural habitat.',
            },
            {
              icon: '📖',
              title: 'Rich Backstory',
              desc: 'Read a warm, narrative story about each plant\'s history and cultural significance.',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-6 text-left hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-3xl mb-3 block">{feature.icon}</span>
              <h3 className="font-display font-semibold text-moss-800 text-lg mb-2">{feature.title}</h3>
              <p className="font-body text-moss-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-moss-400 text-sm font-body">
        <span>🌿 Plantnet AI — Powered by XC Vision</span>
      </footer>
    </main>
  )
}
