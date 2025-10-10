
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function Auth() {
  const session = await auth();
  if (session) redirect("/courses");

  return (
    <main className="w-full min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative w-full max-w-sm bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl border border-zinc-800 shadow-lg space-y-4 text-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#FF8C00] border-b border-[#FF8C00] pb-2">
          Register Now
        </h2>

        <form
          action={async () => {
            "use server";
            await signIn("github");
          }}
        >
          <button
            className="w-full bg-[#FF8C00] text-black font-semibold py-3 rounded-full hover:bg-[#FFA500] active:scale-95 transition-all shadow-sm"
            type="submit"
          >
            GitHub
          </button>
        </form>

        <form
          className="mt-4"
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button
            className="w-full bg-[#FF8C00] text-black font-semibold py-3 rounded-full hover:bg-[#FFA500] active:scale-95 transition-all shadow-sm"
            type="submit"
          >
            Google
          </button>
        </form>
      </div>
    </main>
  );
}
