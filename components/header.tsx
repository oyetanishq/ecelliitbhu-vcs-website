import { auth, signOut } from "@/auth";
import Link from "next/link";

export default async function Header() {
    const session = await auth();

    return (
        <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md text-white border-b border-[#FF8C00] z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center py-3 px-6">
                {/* Logo */}
                <Link href="/" className="text-3xl font-bold text-[#FF8C00] hover:text-[#FFA500] transition-colors">
                    E-Cell IIT BHU
                </Link>

                {/* Navigation */}
                <nav className="flex gap-6 text-sm font-medium items-center">
                    <Link href="/course" className="px-4 py-2 rounded-full bg-zinc-900/70 hover:bg-[#FF8C00] hover:text-black transition-all shadow-sm">
                        Course
                    </Link>

                    {session && session.user ? (
                        <form
                            action={async () => {
                                "use server";
                                await signOut();
                            }}
                        >
                            <button type="submit" className="px-4 py-2 rounded-full bg-[#FF8C00] text-black font-semibold hover:bg-[#FFA500] transition-all shadow-sm">
                                Sign Out
                            </button>
                        </form>
                    ) : (
                        <Link href="/auth" className="px-4 py-2 rounded-full bg-[#FF8C00] text-black font-semibold hover:bg-[#FFA500] transition-all shadow-sm">
                            Register
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
