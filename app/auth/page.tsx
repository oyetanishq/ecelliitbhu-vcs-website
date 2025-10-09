"use client";

import { useSession, signIn } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Auth() {
    const { data: session } = useSession();
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log(form);
    };

    useEffect(() => {
        if (session) router.push("/courses");
    }, [session, router]);

    return (
        <main className="max-w-lg mx-auto p-8 bg-transparent text-white flex-1 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-center mb-6 text-orange-500 border-b-2 border-orange-600 pb-2">Register Now</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-zinc-900 border border-orange-600 p-3 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-zinc-900 border border-orange-600 p-3 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                />

                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-zinc-900 border border-orange-600 p-3 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                />

                <button className="w-full bg-orange-500 text-black font-semibold py-3 rounded-full hover:bg-orange-400 transition-colors">Submit</button>

                <div className="w-full flex justify-center items-center gap-4">
                    <div className="w-1/2 h-px bg-white"></div>
                    <span>OR</span>
                    <div className="w-1/2 h-px bg-white"></div>
                </div>

                <button className="w-full bg-orange-500 text-black font-semibold py-3 rounded-full hover:bg-orange-400 transition-colors cursor-pointer" type="button" onClick={() => signIn("github")}>
                    github
                </button>
            </form>
        </main>
    );
}
