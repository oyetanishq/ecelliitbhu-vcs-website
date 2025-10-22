import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export const { signIn, signOut, auth, handlers } = NextAuth({
    providers: [
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
            const { data, error } = await supabase.from("users").select("email").eq("email", user.email).maybeSingle();

            if (!data) {
                // create user with a default role of 'user'
                const { error: insertError } = await supabase.from("users").insert([
                    {
                        uuid: provider_id,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        role: "user",
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
        async session({ session }) {
            try {
                if (session?.user?.email) {
                    const { data } = await supabase.from("users").select("role").eq("email", session.user.email).maybeSingle();
                    if (data?.role) (session.user as any).role = data.role;
                }
            } catch (e) {
                console.error("session callback error:", e);
            }
            return session;
        },
    },
});
