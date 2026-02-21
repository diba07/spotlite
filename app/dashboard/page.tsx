import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Zap, Calendar, MapPin, Search, User, LogOut } from "lucide-react";

export default async function DashboardPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    // Check role
    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role === "admin") {
        return redirect("/dashboard/admin");
    }

    const upcomingEvents = [
        { title: "Tech Summit 2026", date: "Oct 12", location: "Convention Center" },
        { title: "Jazz in the Park", date: "Nov 05", location: "Central Park" },
    ];

    const handleSignOut = async () => {
        "use server";
        const supabase = await createClient();
        await supabase.auth.signOut();
        return redirect("/login");
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-indigo-500">
            <nav className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Zap className="text-indigo-600 w-6 h-6 fill-current" />
                        <span className="font-bold text-xl uppercase tracking-tight">Spot<span className="text-indigo-400">lite</span></span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-zinc-400 font-medium">
                            <User className="w-4 h-4" />
                            <span className="hidden sm:inline">{user.email}</span>
                        </div>
                        <form action={handleSignOut}>
                            <button className="text-zinc-500 hover:text-white transition-colors">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-black mb-2">
                        User <span className="font-cursive text-indigo-400 lowercase">dashboard</span>
                    </h1>
                    <p className="text-zinc-400">Welcome back! Here's what's happening today.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-8">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Calendar className="text-indigo-400" />
                                Your Upcoming Events
                            </h2>
                            <div className="space-y-4">
                                {upcomingEvents.map((event, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700/50 hover:border-indigo-500/50 transition-colors cursor-pointer group">
                                        <div>
                                            <h3 className="font-bold text-lg group-hover:text-indigo-400">{event.title}</h3>
                                            <div className="flex items-center gap-4 text-sm text-zinc-500 mt-1">
                                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {event.date}</span>
                                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 bg-zinc-800 text-sm font-bold rounded-xl border border-zinc-700 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                            View Tickets
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-indigo-600 rounded-3xl p-8 relative overflow-hidden group shadow-2xl shadow-indigo-600/20">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold mb-2">Discover More</h3>
                            <p className="text-indigo-100 text-sm mb-6 opacity-90">Find the latest workshops and concerts happening near you.</p>
                            <button className="w-full py-3 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2">
                                Explore Now <Search className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
