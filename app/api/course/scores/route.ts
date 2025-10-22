import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function GET(req: NextRequest): Promise<NextResponse> {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    let query = supabase.from("scores").select("week, score");
    if (email) query = query.eq("user_email", email);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ scores: data });
}
