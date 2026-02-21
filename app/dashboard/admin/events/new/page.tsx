"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Zap,
    ArrowLeft,
    Calendar,
    MapPin,
    Banknote,
    Tag,
    Image as ImageIcon,
    Type,
    Navigation,
    Loader2,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function NewEventPage() {
    const router = useRouter();
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        location_name: "",
        full_address: "",
        city: "",
        base_price: "",
        category: "Music",
        image_url: "",
        age_badge: "All Ages",
        latitude: "",
        longitude: ""
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setIsUploading(true);

        try {
            let finalImageUrl = formData.image_url;

            // Handle Image Upload if a file is selected
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError, data } = await supabase.storage
                    .from('flyers')
                    .upload(filePath, imageFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('flyers')
                    .getPublicUrl(filePath);

                finalImageUrl = publicUrl;
            }

            if (!finalImageUrl) {
                throw new Error("Please upload a flyer or provide an image URL");
            }

            const { error } = await supabase.from("events").insert([
                {
                    ...formData,
                    image_url: finalImageUrl,
                    base_price: parseFloat(formData.base_price) || 0,
                    latitude: parseFloat(formData.latitude) || null,
                    longitude: parseFloat(formData.longitude) || null,
                    date: new Date(formData.date).toISOString()
                }
            ]);

            if (error) throw error;

            setSuccess(true);
            setTimeout(() => {
                router.push("/dashboard/admin");
            }, 2000);
        } catch (err: any) {
            alert(err.message || "Something went wrong");
        } finally {
            setIsLoading(false);
            setIsUploading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-white">
                <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-12 text-center max-w-md shadow-2xl">
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Event Created!</h1>
                    <p className="text-zinc-400 mb-8">Your event has been published successfully. Redirecting you to the dashboard...</p>
                    <Loader2 className="w-6 h-6 animate-spin text-indigo-500 mx-auto" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white selection:bg-indigo-500 pb-24">
            {/* Header */}
            <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/dashboard/admin" className="p-2 hover:bg-zinc-800 rounded-xl transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Zap className="text-indigo-600 w-6 h-6 fill-current" />
                        <span className="font-bold text-xl uppercase tracking-tight">Spot<span className="text-indigo-400">lite</span> Create</span>
                    </div>
                    <div className="w-10" /> {/* Spacer */}
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pt-12">
                <div className="mb-12">
                    <h1 className="text-5xl font-black mb-4">Launch New Event</h1>
                    <p className="text-zinc-400 text-lg">Enter the details below to publish your event to the marketplace.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                    {/* Basic Info */}
                    <section className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 md:p-10">
                        <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                            <Type className="text-indigo-400" /> Basic Information
                        </h2>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1">Event Title</label>
                                <input
                                    required
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g. Neon Nights Summer Festival"
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl py-4 px-6 text-xl font-bold outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1">Description</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Tell people why they shouldn't miss this..."
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                        <Calendar className="w-4 h-4" /> Date & Time
                                    </label>
                                    <input
                                        required
                                        type="datetime-local"
                                        value={formData.date}
                                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                        <Tag className="w-4 h-4" /> Category
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all appearance-none"
                                    >
                                        <option>Music</option>
                                        <option>Food</option>
                                        <option>Kids</option>
                                        <option>Nightlife</option>
                                        <option>Sports</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Pricing & Visibility */}
                    <section className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 md:p-10">
                        <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                            <Banknote className="text-indigo-400" /> Pricing & Images
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1">Starting Price (GH₵)</label>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-zinc-500">GH₵</span>
                                    <input
                                        required
                                        type="number"
                                        value={formData.base_price}
                                        onChange={e => setFormData({ ...formData, base_price: e.target.value })}
                                        placeholder="0.00"
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl py-4 pl-16 pr-6 font-bold outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-outfit"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1">Age Badge</label>
                                <select
                                    value={formData.age_badge}
                                    onChange={e => setFormData({ ...formData, age_badge: e.target.value })}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all appearance-none"
                                >
                                    <option>All Ages</option>
                                    <option>Kids</option>
                                    <option>Adults (18+)</option>
                                    <option>Nightlife (21+)</option>
                                </select>
                            </div>
                            <div className="md:col-span-2 space-y-4">
                                <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" /> Event Flyer
                                </label>

                                {!imagePreview ? (
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="border-2 border-dashed border-zinc-800 bg-zinc-800/30 rounded-[2rem] p-12 flex flex-col items-center justify-center gap-4 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/5 transition-all">
                                            <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-500 group-hover:text-indigo-400 group-hover:scale-110 transition-all">
                                                <ImageIcon className="w-8 h-8" />
                                            </div>
                                            <div className="text-center">
                                                <p className="font-bold text-lg">Click or drag flyer here</p>
                                                <p className="text-zinc-500 text-sm">PNG, JPG or WEBP (Max 5MB)</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative group rounded-[2rem] overflow-hidden border border-zinc-800">
                                        <img
                                            src={imagePreview}
                                            alt="Flyer Preview"
                                            className="w-full h-[400px] object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                                            >
                                                Remove Flyer
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-4">
                                    <p className="text-xs text-zinc-600 mb-2 uppercase font-black tracking-widest text-center">Or use an image URL</p>
                                    <input
                                        value={formData.image_url}
                                        onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                        placeholder="https://images.unsplash.com/..."
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Directions & Location */}
                    <section className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 md:p-10">
                        <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                            <Navigation className="text-indigo-400" /> Location & Directions
                        </h2>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1">Venue Name</label>
                                <div className="relative">
                                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                    <input
                                        required
                                        value={formData.location_name}
                                        onChange={e => setFormData({ ...formData, location_name: e.target.value })}
                                        placeholder="e.g. Madison Square Garden"
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl py-4 pl-14 pr-6 font-bold outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1">Full Street Address</label>
                                    <input
                                        required
                                        value={formData.full_address}
                                        onChange={e => setFormData({ ...formData, full_address: e.target.value })}
                                        placeholder="123 Discovery Way"
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1">City</label>
                                    <input
                                        required
                                        value={formData.city}
                                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                                        placeholder="New York"
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-bold"
                                    />
                                </div>
                            </div>

                            {/* Coordinates for Map */}
                            <div className="pt-6 border-t border-zinc-800">
                                <p className="text-sm text-zinc-500 mb-6 flex items-center gap-2">
                                    <Navigation className="w-4 h-4" /> Adding coordinates will enable the interactive map for directions.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1">Latitude</label>
                                        <input
                                            type="text"
                                            value={formData.latitude}
                                            onChange={e => setFormData({ ...formData, latitude: e.target.value })}
                                            placeholder="e.g. 40.7128"
                                            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1">Longitude</label>
                                        <input
                                            type="text"
                                            value={formData.longitude}
                                            onChange={e => setFormData({ ...formData, longitude: e.target.value })}
                                            placeholder="e.g. -74.0060"
                                            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Action */}
                    <div className="pt-8">
                        <button
                            disabled={isLoading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black text-2xl py-6 rounded-[2.5rem] shadow-2xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-8 h-8 animate-spin" /> Publishing...
                                </>
                            ) : (
                                <>
                                    Publish Event <Zap className="w-6 h-6 fill-current" />
                                </>
                            )}
                        </button>
                        <p className="text-center text-zinc-500 mt-6 text-sm">
                            Your event will be immediately visible to all Spotlite explorers once published.
                        </p>
                    </div>
                </form>
            </main>
        </div>
    );
}
