import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function Auth() {
    const session = await auth();

    if (session) redirect("/courses");

    return (
        <main className="w-full bg-transparent text-white flex-1 flex flex-col justify-center items-center">
            <div className="w-full max-w-sm">
                <h2 className="text-3xl font-bold text-center mb-6 text-orange-500 border-b-2 border-orange-600 pb-2">Register Now</h2>
                <form
                    className="mt-4"
                    action={async () => {
                        "use server";
                        await signIn("google");
                    }}
                >
                    <button className="w-full bg-orange-500 text-black font-semibold py-3 rounded-full hover:bg-orange-400 transition-colors cursor-pointer" type="submit">
                        google
                    </button>
                </form>
            </div>
        </main>
    );
}
