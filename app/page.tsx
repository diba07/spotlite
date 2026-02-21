"use client";

import Image from "next/image";
import { Search, MapPin, Calendar, Users, Music, Utensils, Zap, Filter } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [searchFocused, setSearchFocused] = useState(false);

  const categories = [
    { name: "Music", icon: <Music className="w-5 h-5" />, color: "bg-blue-500/10 text-blue-400" },
    { name: "Food", icon: <Utensils className="w-5 h-5" />, color: "bg-orange-500/10 text-orange-400" },
    { name: "Kids", icon: <Users className="w-5 h-5" />, color: "bg-purple-500/10 text-purple-400" },
    { name: "Nightlife", icon: <Zap className="w-5 h-5" />, color: "bg-yellow-500/10 text-yellow-400" },
  ];

  const featuredEvents = [
    {
      id: 1,
      title: "Neon Nights Music Festival",
      date: "Aug 15, 2026",
      location: "Downtown Plaza",
      price: "From GH₵45",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800",
      category: "Music",
    },
    {
      id: 2,
      title: "Family Fun: Science Expo",
      date: "Sept 02, 2026",
      location: "Grand Exhibition Hall",
      price: "Free",
      image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800",
      category: "Kids",
    },
    {
      id: 3,
      title: "Gourmet Street Food Tour",
      date: "Every Weekend",
      location: "Historic Quarter",
      price: "From GH₵25",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
      category: "Food",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 font-sans selection:bg-indigo-500 selection:text-white text-zinc-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="text-white w-5 h-5 fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white uppercase italic">
              Spot<span className="text-indigo-400">lite</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-indigo-400 transition-colors">Discover</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Organize</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <Link href="/login" className="px-4 py-2 font-medium text-white hover:opacity-70 transition-opacity">
              Log in
            </Link>
            <Link href="/signup" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-center justify-center pt-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-zinc-950 z-10" />
            <Image
              src="/hero.png"
              alt="Festival Crowd"
              fill
              className="object-cover scale-105 animate-pulse-slow opacity-60"
              priority
            />
          </div>

          <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight leading-[1.1]">
              Unforgettable <span className="text-indigo-400 font-cursive lowercase">experiences</span>, <br />
              just around the corner.
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 mb-12 max-w-2xl mx-auto font-medium opacity-90">
              The premium events marketplace for locals & global explorers. Discover, book, and enjoy in seconds.
            </p>

            {/* Search Bar */}
            <div className={`
              max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-2 transition-all duration-300
              ${searchFocused ? 'scale-105 ring-4 ring-indigo-500/20 border-indigo-500/50' : ''}
            `}>
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl outline-none text-white font-medium bg-transparent placeholder:text-zinc-600"
                />
              </div>
              <div className="h-10 w-[1px] bg-zinc-800 hidden md:block" />
              <div className="relative flex-1 w-full">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Where? (City or Venue)"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl outline-none text-white font-medium bg-transparent placeholder:text-zinc-600"
                />
              </div>
              <button className="w-full md:w-auto px-10 py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 group">
                Search
                <Zap className="w-4 h-4 transition-transform group-hover:rotate-12" />
              </button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
                Browse by <span className="font-cursive text-indigo-400 lowercase">category</span>
              </h2>
              <p className="text-zinc-400 font-medium">Find exactly what you're in the mood for</p>
            </div>
            <button className="flex items-center gap-2 text-indigo-400 font-bold hover:gap-3 transition-all">
              View All <Filter className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="group cursor-pointer p-8 rounded-3xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900 hover:border-zinc-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{cat.name}</h3>
                <p className="text-zinc-500 text-sm font-medium">120+ Events</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Events Section */}
        <section className="py-24 px-6 bg-zinc-900/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 tracking-tight">Spotlight Events</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredEvents.map((event) => (
                <div key={event.id} className="group cursor-pointer bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-zinc-900/90 backdrop-blur rounded-full text-xs font-bold uppercase tracking-widest text-white">
                        {event.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold mb-3 uppercase tracking-wider">
                      <Calendar className="w-4 h-4 text-indigo-400/80" />
                      {event.date}
                    </div>
                    <h3 className="text-2xl font-extrabold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium mb-6">
                      <MapPin className="w-4 h-4 opacity-50" />
                      {event.location}
                    </div>
                    <div className="flex items-center justify-between border-t border-zinc-800 pt-6">
                      <span className="text-2xl font-black text-white">{event.price}</span>
                      <Link href="/login" className="px-6 py-3 bg-white text-zinc-900 rounded-2xl font-bold hover:bg-indigo-600 hover:text-white transition-colors text-center">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto bg-indigo-600 rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center md:text-left shadow-2xl shadow-indigo-500/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1]">
                  Ready to host <br /> your next event?
                </h2>
                <p className="text-indigo-100 text-lg md:text-xl font-medium opacity-90">
                  Join 5,000+ organizers worldwide using spotlite to power their ticketing.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup" className="px-10 py-5 bg-white text-indigo-600 rounded-full font-bold text-lg hover:bg-zinc-100 transition-colors shadow-2xl">
                  Create Event
                </Link>
                <button className="px-10 py-5 border-2 border-indigo-400/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-zinc-800 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Zap className="text-indigo-600 w-5 h-5 fill-current" />
            <span className="font-bold text-white">spotlite © 2026</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-zinc-500">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Instagram</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
