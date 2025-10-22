import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function GET(req: NextRequest): Promise<NextResponse> {
    const session = await auth();
    if (!session || !session.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    if ((session as any).user?.role !== "admin") return NextResponse.json({ error: "forbidden" }, { status: 403 });

    // fetch all users with their registrations
    const { data: users, error: usersErr } = await supabase.from("users").select("email, name, image, role");
    if (usersErr) return NextResponse.json({ error: usersErr.message }, { status: 500 });

    // fetch registrations
    const { data: regs, error: regsErr } = await supabase.from("registrations").select("user_email, course_id");
    if (regsErr) return NextResponse.json({ error: regsErr.message }, { status: 500 });

    // fetch scores
    const { data: scores, error: scoresErr } = await supabase.from("scores").select("user_email, week, score");
    if (scoresErr) return NextResponse.json({ error: scoresErr.message }, { status: 500 });

    // assemble results
    const usersMap = (users || []).map((u: any) => ({
        email: u.email,
        name: u.name,
        image: u.image,
        role: u.role,
        registered_course_id: (regs || []).find((r: any) => r.user_email === u.email)?.course_id ?? null,
        scores: (scores || []).filter((s: any) => s.user_email === u.email).reduce((acc: any, s: any) => ({ ...acc, [s.week]: s.score }), {}),
    }));

    return NextResponse.json({ users: usersMap });
}
