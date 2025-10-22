import { auth, supabase } from "@/auth";
import ScoreEditor from "./ScoreEditor";

export default async function Page() {
    const session = await auth();
    if (!session || !session.user) return <div className="p-8">Unauthorized</div>;

    // fetch role directly to be certain
    const { data: profile } = await supabase.from("users").select("role").eq("email", session.user.email).maybeSingle();
    if (!profile || profile.role !== "admin") return <div className="p-8">Forbidden</div>;

    const req = await fetch((process.env.NEXT_PUBLIC_BASE_URL ?? "") + "/api/admin/users", { cache: "no-store" });
    const res = await req.json();
    const users = res?.users || [];

    const weeks = [1, 2, 3, 4, 5];

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Admin: Users & Scores</h1>

            <div className="overflow-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-2 py-1">Name</th>
                            <th className="border px-2 py-1">Email</th>
                            <th className="border px-2 py-1">Role</th>
                            <th className="border px-2 py-1">Registered</th>
                            {weeks.map((w) => (
                                <th key={w} className="border px-2 py-1">
                                    Week {w}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u: any) => (
                            <tr key={u.email} className="hover:bg-gray-50">
                                <td className="border px-2 py-1">{u.name}</td>
                                <td className="border px-2 py-1">{u.email}</td>
                                <td className="border px-2 py-1">{u.role}</td>
                                <td className="border px-2 py-1">{u.registered_course_id ?? "-"}</td>
                                {weeks.map((w) => (
                                    <td key={w} className="border px-2 py-1">
                                        <ScoreEditor userEmail={u.email} week={w} initialScore={u.scores?.[w] ?? null} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
