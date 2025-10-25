import { auth, supabase } from "@/auth";
import ScoreEditor from "./ScoreEditor";
import RoleToggle from "./RoleToggle";

export default async function Page() {
    const session = await auth();
    if (!session || !session.user) return <div className="p-8">Unauthorized</div>;

    // fetch role directly to be certain
    const { data: profile } = await supabase.from("users").select("role").eq("email", session.user.email).maybeSingle();
    if (!profile || profile.role !== "admin") return <div className="p-8">Forbidden</div>;

    // Query users/registrations/scores directly on the server to avoid requiring a separate internal fetch
    const [{ data: usersData }, { data: regsData }, { data: scoresData }] = await Promise.all([
        supabase.from("users").select("email, name, image, role"),
        supabase.from("registrations").select("user_email, course_id"),
        supabase.from("scores").select("user_email, week, score"),
    ]);

    const usersList = (usersData || []).map((u: any) => ({
        email: u.email,
        name: u.name,
        image: u.image,
        role: u.role ?? "user",
        registered_course_id: (regsData || []).find((r: any) => r.user_email === u.email)?.course_id ?? null,
        scores: (scoresData || []).filter((s: any) => s.user_email === u.email).reduce((acc: any, s: any) => ({ ...acc, [s.week]: s.score }), {}),
    }));

    // sort admins first
    usersList.sort((a: any, b: any) => {
        if (a.role === b.role) return (a.name || "").localeCompare(b.name || "");
        if (a.role === "admin") return -1;
        if (b.role === "admin") return 1;
        return (a.name || "").localeCompare(b.name || "");
    });

    const users = usersList;

    const weeks = [1, 2, 3, 4, 5];

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Admin: Users & Scores</h1>

            <div className="overflow-scroll">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="border">
                            <th className="border-r px-2 py-1 min-w-80">Name</th>
                            <th className="border-r px-2 py-1 min-w-80">Email</th>
                            <th className="border-r px-2 py-1 min-w-40">Role</th>
                            <th className="border-r px-2 py-1 min-w-52">Registered</th>
                            {weeks.map((w) => (
                                <th key={w} className="border-r px-3 py-1">
                                    Week {w}
                                </th>
                            ))}
                            <th className="px-2 py-1 min-w-40">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u: any) => (
                            <tr key={u.email} className="hover:bg-gray-50/10 border h-16">
                                <td className="px-2 py-1">{u.name}</td>
                                <td className="px-2 py-1">{u.email}</td>
                                <td className="px-2 py-1">
                                    <div className="flex justify-center items-center">
                                        <span
                                            className={`min-w-16 px-3 py-1 text-xs font-bold rounded-full text-center ${u.role === "admin" ? "text-red-700 bg-red-100" : "bg-blue-100 text-blue-700"}`}
                                        >
                                            {u.role}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-2 py-1">
                                    {u.registered_course_id ? (
                                        <a className="text-white" href={`/course`}>
                                            {u.registered_course_id}
                                        </a>
                                    ) : (
                                        "-"
                                    )}
                                </td>
                                {weeks.map((w) => (
                                    <td key={w} className="px-3 py-1">
                                        <ScoreEditor userEmail={u.email} week={w} initialScore={u.scores?.[w] ?? null} />
                                    </td>
                                ))}

                                <td className="px-2 py-1">
                                    <div className="flex justify-center items-center">
                                        <RoleToggle email={u.email} currentRole={u.role} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
