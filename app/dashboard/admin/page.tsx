import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Zap, Shield, Users, BarChart3, Settings, LogOut, LayoutGrid } from "lucide-react";

export default async function AdminDashboardPage() {
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

    if (profile?.role !== "admin") {
        return redirect("/dashboard");
    }

    const stats = [
        { label: "Total Users", value: "2,543", trend: "+12%", icon: <Users className="w-5 h-5" /> },
        { label: "Active Events", value: "128", trend: "+5%", icon: <LayoutGrid className="w-5 h-5" /> },
        { label: "Revenue", value: "GH₵45,210", trend: "+23%", icon: <BarChart3 className="w-5 h-5" /> },
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
                        <div className="bg-red-600 w-8 h-8 rounded-lg flex items-center justify-center">
                            <Shield className="text-white w-5 h-5 fill-current" />
                        </div>
                        <span className="font-bold text-xl uppercase tracking-tight">Spot<span className="text-indigo-400">lite</span> <span className="text-[10px] bg-red-600 px-1.5 py-0.5 rounded ml-1 tracking-widest font-black">ADMIN</span></span>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-zinc-500 text-sm font-medium hidden sm:inline">{user.email}</span>
                        <form action={handleSignOut}>
                            <button className="text-zinc-500 hover:text-white transition-colors">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black mb-2">
                            Admin Command <span className="font-cursive text-indigo-400 lowercase italic">center</span>
                        </h1>
                        <p className="text-zinc-400">Manage your entire platform operations here.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/dashboard/admin/events/new" className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-colors flex items-center gap-2">
                            <Zap className="w-4 h-4 fill-current" /> Launch New Event
                        </Link>
                        <button className="px-3 py-3 bg-zinc-900 border border-zinc-800 text-white rounded-2xl hover:bg-zinc-800 transition-colors">
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] hover:border-red-500/30 transition-all cursor-default group">
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform text-zinc-400 group-hover:text-red-400">
                                    {stat.icon}
                                </div>
                                <span className="text-emerald-500 text-sm font-black">{stat.trend}</span>
                            </div>
                            <p className="text-zinc-500 font-bold text-sm uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-4xl font-black">{stat.value}</h3>
                        </div>
                    ))}
                </div>

                {/* Table Mockup */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 overflow-hidden">
                    <h2 className="text-2xl font-bold mb-8">Recent Activities</h2>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="flex items-center justify-between p-6 border-b border-zinc-800 last:border-0 hover:bg-zinc-800/30 transition-colors rounded-2xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold">New user registered: user_{n}@example.com</p>
                                        <p className="text-xs text-zinc-500">2 minutes ago</p>
                                    </div>
                                </div>
                                <button className="text-zinc-500 hover:text-white font-bold p-2">
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

function ArrowRight(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}
