import { auth } from "@/auth";

export default async function Page() {
    const session = await auth();
    if (!session || !session.user) return <div className="p-8">Login required</div>;

    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";

    // fetch weeks metadata and user's scores
    const [weeksReq, scoresReq] = await Promise.all([
        fetch(base + "/api/course/weeks", { cache: "no-store" }),
        fetch(base + "/api/course/scores?email=" + encodeURIComponent(session.user.email || ""), { cache: "no-store" }),
    ]);

    const weeksRes = await weeksReq.json();
    const scoresRes = await scoresReq.json();

    const weeks = weeksRes?.weeks || [];
    const scoresMap = (scoresRes?.scores || []).reduce((acc: any, s: any) => ({ ...acc, [s.week]: s.score }), {});

    /**
     * Helper component to display the score with appropriate color.
     */
    const getScoreDisplay = (score: any) => {
        if (score === null || score === undefined) {
            return (
                <div className="text-3xl font-bold text-gray-300 dark:text-gray-600">
                    -
                </div>
            );
        }

        const numericScore = Number(score);
        let colorClass = "text-red-500 dark:text-red-400";
        let bgGradient = "from-red-500/10 to-red-600/5";

        if (numericScore >= 90) {
            colorClass = "text-green-500 dark:text-green-400";
            bgGradient = "from-green-500/10 to-green-600/5";
        } else if (numericScore >= 70) {
            colorClass = "text-yellow-500 dark:text-yellow-400";
            bgGradient = "from-yellow-500/10 to-yellow-600/5";
        }

        return (
            <div className={`relative`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} rounded-2xl blur-xl`}></div>
                <div className={`relative text-3xl font-bold ${colorClass}`}>
                    {numericScore}
                </div>
            </div>
        );
    };

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-200 to-blue-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Course Modules
                </h1>
                <p className="text-white-600 dark:text-gray-400">
                    Track your progress and access course materials
                </p>
            </div>

            <div className="grid gap-6">
                {weeks.map((w: any) => {
                    const score = scoresMap[w.week];
                    return (
                        <div 
                            key={w.week} 
                            className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 overflow-hidden"
                        >
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 rounded-2xl"></div>
                            
                            {/* Accent border gradient */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-sm -z-10"></div>

                            <div className="relative flex items-center justify-between p-6 md:p-7 gap-6">
                                
                                {/* Left Side: Module Number Badge + Title & Links */}
                                <div className="flex items-start gap-4 flex-1 min-w-0">
                                    {/* Module Number Badge */}
                                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-110">
                                        <span className="text-white font-bold text-lg">
                                            {w.week}
                                        </span>
                                    </div>

                                    {/* Title and Links */}
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                            {w.title}
                                        </h2>
                                        <div className="flex items-center gap-3 flex-wrap">
                                            {/* Content Link Pill */}
                                            <a 
                                                href={w.doc_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="group/link inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 hover:from-blue-100 hover:to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 dark:text-blue-300 dark:hover:from-blue-800/70 dark:hover:to-blue-700/70 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
                                            >
                                                <span className="text-base">📖</span>
                                                <span className="hidden sm:inline">View Content</span>
                                                <span className="sm:hidden">Content</span>
                                                <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </a>

                                            {/* Submission Link Pill */}
                                            <a 
                                                href={w.submission_link} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="group/link inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 hover:from-orange-100 hover:to-orange-200 dark:from-orange-900/50 dark:to-orange-800/50 dark:text-orange-300 dark:hover:from-orange-800/70 dark:hover:to-orange-700/70 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
                                            >
                                                <span className="text-base">📝</span>
                                                <span className="hidden sm:inline">Submit Assignment</span>
                                                <span className="sm:hidden">Submit</span>
                                                <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Right Side: Score Display */}
                                <div className="flex-shrink-0 flex flex-col items-center justify-center px-6 py-4 rounded-xl bg-gray-50/50 dark:bg-gray-900/30 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 min-w-[100px] group-hover:bg-gray-100/50 dark:group-hover:bg-gray-900/50 transition-all duration-300">
                                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                                        Score
                                    </div>
                                    {getScoreDisplay(score)}
                                    {score !== null && score !== undefined && (
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            / 100
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
