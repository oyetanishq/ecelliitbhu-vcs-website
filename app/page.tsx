import Link from "next/link";

export const COURSES = [
    {
        id: "entrepreneurship-bootcamp",
        title: "Entrepreneurship Bootcamp",
        duration: "8 weeks",
        price: "Free",
        short: "Hands-on training for aspiring entrepreneurs.",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac varius mauris, sed hendrerit ex. Ut sit amet metus id risus facilisis porta.",
    },
    {
        id: "startup-fundamentals",
        title: "Startup Fundamentals",
        duration: "6 weeks",
        price: "₹1499",
        short: "A course on business models, funding, and pitching.",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porttitor est sit amet interdum varius, sem odio convallis turpis.",
    },
    {
        id: "innovation-lab",
        title: "Innovation Lab",
        duration: "4 weeks",
        price: "Free",
        short: "Fostering creativity through real-world projects.",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tristique sapien at ligula tempus, ac facilisis urna pharetra.",
    },
];

export default function Home() {
    // const navigate = useNavigate();

    return (
        <main className="max-w-6xl mx-auto p-6 space-y-16 bg-transparent text-white min-h-screen">
            {/* HERO SECTION */}
            <section className="grid md:grid-cols-2 gap-10 items-center pt-10">
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-orange-500">Empowering Innovators of Tomorrow</h1>
                    <p className="text-gray-300 mb-8 leading-relaxed">E-Cell IIT BHU nurtures entrepreneurial spirit by organizing bootcamps, workshops, and courses designed to help students turn their ideas into impactful startups.</p>

                    <div className="flex gap-4">
                        <Link href="/register" className="px-6 py-2.5 bg-orange-500 text-black font-semibold rounded-full hover:bg-orange-400 transition-colors">
                            Join Now
                        </Link>
                        <Link href="/login" className="px-6 py-2.5 border border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-500 hover:text-black transition-colors">
                            Explore Courses
                        </Link>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-orange-600 p-6 rounded-2xl shadow-lg shadow-orange-500/10">
                    <h3 className="text-lg font-semibold mb-4 text-orange-400">Why E-Cell IIT BHU?</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Learn from top founders & mentors</li>
                        <li>Hands-on startup building experience</li>
                        <li>Access to exclusive networking events</li>
                    </ul>
                </div>
            </section>

            {/* POPULAR COURSES SECTION */}
            <section>
                <h2 className="text-2xl font-bold mb-8 text-orange-500 border-b-2 border-orange-600 pb-2">Popular Courses</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {COURSES.map((c) => (
                        <article key={c.id} className="p-6 border border-orange-600 rounded-2xl bg-zinc-900 hover:shadow-lg hover:shadow-orange-500/20 transition">
                            <h4 className="font-semibold text-lg mb-2 text-orange-400">{c.title}</h4>
                            <p className="text-sm text-gray-300 mb-4">{c.short}</p>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">{c.duration}</span>
                                <Link href={`/courses#${c.id}`} className="text-orange-400 hover:text-orange-300 transition-colors">
                                    Details →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="text-center text-sm text-gray-500 py-10 border-t border-orange-600">© {new Date().getFullYear()} E-Cell IIT BHU</footer>
        </main>
    );
}
