import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function POST(req: NextRequest): Promise<NextResponse> {
    const session = await auth();
    if (!session || !session.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    if ((session as any).user?.role !== "admin") return NextResponse.json({ error: "forbidden" }, { status: 403 });

    const body = await req.json();
    const { user_email, week, score } = body;
    if (!user_email || typeof week !== "number") return NextResponse.json({ error: "user_email and week required" }, { status: 400 });

    // upsert score
    const { error } = await supabase.from("scores").upsert({ user_email, week, score }, { onConflict: "user_email,week" });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true });
}
