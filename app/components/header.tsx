"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
    const { data: session } = useSession();

    return (
        <header className="w-full bg-transparent text-white">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo / Brand */}
                <Link href="/" className="text-2xl font-extrabold text-orange-500 hover:text-orange-400 transition-colors">
                    E-Cell IIT BHU
                </Link>

                {/* Navigation Links */}
                <nav className="flex gap-6 text-sm font-medium">
                    <Link href="/courses" className="px-4 py-1.5 border border-white-200 rounded-full bg-black text-white font-semibold hover:bg-orange-400 transition-colors">
                        Courses
                    </Link>

                    {session && session.user ? (
                        <button className="px-4 py-1.5 rounded-full bg-orange-500 text-black font-semibold hover:bg-orange-400 transition-colors cursor-pointer" onClick={async () => await signOut()}>
                            signout
                        </button>
                    ) : (
                        <Link href="/auth" className="px-4 py-1.5 rounded-full bg-orange-500 text-black font-semibold hover:bg-orange-400 transition-colors">
                            Register
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
