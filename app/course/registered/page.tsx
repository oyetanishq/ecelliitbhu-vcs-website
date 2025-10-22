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

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Course Weeks</h1>
            <div className="grid gap-4">
                {weeks.map((w: any) => (
                    <div key={w.week} className="p-4 border rounded">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-lg font-semibold">
                                    Week {w.week}: {w.title}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Submission Link:{" "}
                                    <a href={w.submission_link} target="_blank" rel="noreferrer" className="text-orange-500">
                                        Open Form
                                    </a>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm">Score</div>
                                <div className="text-xl font-bold">{scoresMap[w.week] ?? "-"}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
