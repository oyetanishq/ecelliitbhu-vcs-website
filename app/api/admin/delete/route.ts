import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function DELETE(req: NextRequest) {
    const session = await auth();
    if (!session || !session.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    // verify caller is admin
    const { data: caller } = await supabase.from("users").select("role").eq("email", session.user.email).maybeSingle();
    if (!caller || caller.role !== "admin") return NextResponse.json({ error: "forbidden" }, { status: 403 });

    const body = await req.json();
    const { user_email } = body;
    if (!user_email) return NextResponse.json({ error: "user_email required" }, { status: 400 });

    // prevent admin from deleting themselves
    if (user_email === session.user.email) return NextResponse.json({ error: "cannot delete yourself" }, { status: 400 });

    // delete user's registrations first
    await supabase.from("registrations").delete().eq("user_email", user_email);

    // delete user's scores
    await supabase.from("scores").delete().eq("user_email", user_email);

    // delete user
    const { error } = await supabase.from("users").delete().eq("email", user_email);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true });
}
