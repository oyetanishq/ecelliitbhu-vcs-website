import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

// POST: register user to a course with profile details
export async function POST(req: NextRequest): Promise<NextResponse> {
    const session = await auth();
    if (!session || !session.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const body = await req.json();
    const { course_id, full_name, institution, current_year, course, branch, phone_number } = body;

    if (!course_id) return NextResponse.json({ error: "course_id required" }, { status: 400 });
    if (!full_name || !institution || !current_year || !course || !branch || !phone_number) {
        return NextResponse.json({ error: "all profile fields required" }, { status: 400 });
    }

    // ensure user not already registered
    const { data: existing } = await supabase.from("registrations").select("id").eq("user_email", session.user.email).maybeSingle();
    if (existing) return NextResponse.json({ error: "already registered" }, { status: 400 });

    // update user profile fields
    const { error: updateErr } = await supabase.from("users").update({ full_name, institution, current_year, course, branch, phone_number }).eq("email", session.user.email);

    if (updateErr) return NextResponse.json({ error: updateErr.message }, { status: 500 });

    // create registration
    const { error: regErr } = await supabase.from("registrations").insert({ user_email: session.user.email, course_id });
    if (regErr) return NextResponse.json({ error: regErr.message }, { status: 500 });

    return NextResponse.json({ ok: true });
}
