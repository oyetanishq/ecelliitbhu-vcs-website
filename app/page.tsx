import Link from "next/link";

export default async function Home() {
    return (
        <main className="min-h-screen bg-cover bg-center bg-fixed text-white" style={{ backgroundImage: "url('/e-cell.jpeg')" }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70"></div>

            <div className="relative max-w-6xl mx-auto p-6 space-y-16">
                {/* Hero Section */}
                <section className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-[#FF8C00] leading-tight">Empowering Innovators of Tomorrow</h1>
                        <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                            E-Cell IIT BHU nurtures entrepreneurial spirit by organizing bootcamps, workshops, and courses designed to help students turn their ideas into impactful startups.
                        </p>

                        <div className="flex gap-4 flex-wrap">
                            <Link href="/auth" className="px-6 py-3 bg-[#FF8C00] text-black font-semibold rounded-full hover:bg-[#FFA500] active:scale-95 transition-all shadow-sm">
                                Join Now
                            </Link>
                            <Link
                                href="/courses"
                                className="px-6 py-3 border border-[#FF8C00] text-[#FF8C00] font-semibold rounded-full hover:bg-[#FF8C00] hover:text-black active:scale-95 transition-all shadow-sm"
                            >
                                Explore Courses
                            </Link>
                        </div>
                    </div>

                    <div className="bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl border border-zinc-800 shadow-lg shadow-black/20">
                        <h3 className="text-xl font-semibold mb-4 text-[#FF8C00]">Why E-Cell IIT BHU?</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>Learn from top founders & mentors</li>
                            <li>Hands-on startup building experience</li>
                            <li>Access to exclusive networking events</li>
                        </ul>
                    </div>
                </section>

                {/* Popular Courses */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 text-[#FF8C00] border-b border-[#FF8C00] pb-2 text-center md:text-left">Popular Courses</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* {courses.map((c) => (
                            <article
                                key={c.id}
                                className="p-6 border border-zinc-800 rounded-2xl bg-zinc-900/80 backdrop-blur-md hover:border-[#FF8C00]/70 hover:shadow-lg hover:shadow-[#FF8C00]/20 transition-all duration-300"
                            >
                                <h4 className="font-semibold text-lg mb-2 text-[#FF8C00] group-hover:text-[#FFA500]">{c.title}</h4>
                                <p className="text-gray-300 mb-4">{c.short}</p>
                                <div className="flex items-center justify-between text-sm text-gray-400">
                                    {c.duration}
                                    <Link href={`/courses#${c.id}`} className="text-[#FF8C00] hover:text-[#FFA500] transition-colors">
                                        Details →
                                    </Link>
                                </div>
                            </article>
                        ))} */}
                    </div>
                </section>

                {/* Footer */}
                <footer className="text-center text-sm text-gray-500 py-10 border-t border-zinc-800 relative">© {new Date().getFullYear()} E-Cell IIT BHU</footer>
            </div>
        </main>
    );
}
