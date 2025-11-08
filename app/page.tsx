import Link from "next/link";

const courses = [
    { id: 1, title: "Venture Capital 101", short: "Learn the fundamentals of VC.", duration: "8 Weeks" },
    { id: 2, title: "Startup Idea Validation", short: "How to know if your idea is a winner.", duration: "4 Weeks" },
    { id: 3, title: "Growth Hacking Basics", short: "Scale your startup fast.", duration: "6 Weeks" },
];

export default async function Home() {
    return (
        <div className="w-full bg-transparent">
            {/* Hero Section */}
            <section className="min-h-[90vh] bg-cover bg-center bg-fixed relative" style={{ backgroundImage: "url('/e-cell.jpeg')" }}>
                {/* Overlay with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>

                <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10 space-y-8">
                    {/* Main Hero Content */}
                    <section className="grid md:grid-cols-2 gap-10 items-center">
                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-6xl font-extrabold text-[#FF8C00] leading-tight">
                                Empowering Innovators of Tomorrow
                            </h1>
                            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                                VC Scout is a structured course endorsed by leading Venture Capital firms, designed to introduce students to the world of startup investments. Learn the fundamentals of venture capital, deal sourcing, and evaluation directly from industry experts and top investors.  </p>

                            <div className="flex gap-4 flex-wrap pt-4">
                                <a
                                    href="https://chat.whatsapp.com/FKpfFAEdb001JPVIeDh1J0?mode=wwt"
                                    target="_blank" // Opens the link in a new tab
                                    rel="noopener noreferrer" // Security best practice for new tabs
                                   className="px-6 py-3 bg-[#FF8C00] text-black font-semibold rounded-full hover:bg-[#FFA500] hover:text-black active:scale-95 transition-all shadow-lg hover:shadow-[#FF8C00]/50"
                                >
                                    Join Now
                                </a>
                            </div>
                        </div>

                        <div className="bg-zinc-900/80 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-zinc-800 shadow-lg shadow-black/20 hover:border-[#FF8C00]/50 transition-all duration-300">
                            <h3 className="text-xl font-semibold mb-4 text-[#FF8C00]">Why VC Scout IIT BHU?</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-[#FF8C00] font-bold text-lg">•</span>
                                    <span>Learn from top founders & mentors</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#FF8C00] font-bold text-lg">•</span>
                                    <span>Hands-on startup building experience</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#FF8C00] font-bold text-lg">•</span>
                                    <span>Access to exclusive networking events</span>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
}
