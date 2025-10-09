import Link from "next/link";
import { COURSES } from "@/app/page";

export default function Courses() {
    return (
        <main className="max-w-6xl mx-auto p-6 space-y-10 bg-transparent text-white min-h-screen">
            <h2 className="text-3xl font-bold text-orange-500 border-b-2 border-orange-600 pb-2">Courses</h2>

            <div className="grid md:grid-cols-2 gap-8">
                {COURSES.map((c) => (
                    <div key={c.id} id={c.id} className="border border-orange-600 rounded-xl p-5 bg-zinc-900 hover:shadow-lg hover:shadow-orange-500/20 transition">
                        <h3 className="text-xl font-semibold mb-2 text-orange-400">{c.title}</h3>
                        <p className="text-gray-300 mb-4">{c.details}</p>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">
                                {c.duration} • {c.price}
                            </span>

                            <Link href="/register" className="px-4 py-1.5 bg-orange-500 text-black font-semibold rounded-full hover:bg-orange-400 transition-colors">
                                Enroll
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
