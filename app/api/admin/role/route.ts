import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session || !session.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    // verify caller is admin
    const { data: caller } = await supabase.from("users").select("role").eq("email", session.user.email).maybeSingle();
    if (!caller || caller.role !== "admin") return NextResponse.json({ error: "forbidden" }, { status: 403 });

    const body = await req.json();
    const { user_email, role } = body;
    if (!user_email || !role) return NextResponse.json({ error: "user_email and role required" }, { status: 400 });

    const { error } = await supabase.from("users").update({ role }).eq("email", user_email);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true });
}
