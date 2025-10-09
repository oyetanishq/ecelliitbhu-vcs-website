import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const { signIn, signOut, auth, handlers } = NextAuth({
    providers: [
        Github({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        Google({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async signIn({ user, account }) {
            if (!user?.email) return false;

            const provider_id = account?.providerAccountId;

            // check if user exists
            const { data, error } = await supabase.from("users").select("id").eq("email", user.email).single();

            if (!data) {
                const { error: insertError } = await supabase.from("users").insert([
                    {
                        uuid: provider_id,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                    },
                ]);

                if (insertError) {
                    console.error("Supabase insert error:", insertError);
                    return false;
                }
            } else if (error) {
                console.error("error:", error);
                return false;
            }

            return true;
        },
    },
});
