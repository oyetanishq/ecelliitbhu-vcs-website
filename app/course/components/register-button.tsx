// import { auth } from "@/auth";
// import { Button } from "@/components/ui/button";

// export default async function RegisterButton() {
//     const session = await auth();
//     if (!session || !session.user)
//         return (
//             <Button size="lg" disabled className="rounded-full px-8">
//                 LOGIN REQUIRED
//             </Button>
//         );

//     const req = await fetch(process.env.NEXT_PUBLIC_BASE_URL! + "/api/user/" + session.user.email);
//     const res = await req.json();

//     return res?.registered_course_id ? (
//         <Button size="lg" disabled className="bg-gray-400 text-white rounded-full px-8">
//             ALREADY REGISTERED
//         </Button>
//     ) : (
//         <form action="/api/course" method="post">
//             <input type="text" name="course_id" value="ai-course-2025" hidden />
//             <Button size="lg" type="submit" className="bg-orange-500 text-primary-foreground hover:bg-orange-500/90 rounded-full px-8">
//                 REGISTER FOR AI
//             </Button>
//         </form>
//     );
// }
import { Button } from "@/components/ui/button";

type RegisterButtonProps = {
    status: "no-session" | "unregistered" | "registered";
};

export default function RegisterButton({ status }: RegisterButtonProps) {
    if (status === "no-session") {
        return (
            <Button size="lg" disabled className="rounded-full px-8">
                LOGIN REQUIRED
            </Button>
        );
    }

    if (status === "registered") {
        return (
            <a href="/course/registered">
                <Button size="lg" className="bg-green-500 text-white rounded-full px-8">
                    OPEN COURSE
                </Button>
            </a>
        );
    }

    // unregistered case - redirect to registration form
    return (
        <a href="/course/register">
            <Button size="lg" className="bg-orange-500 text-primary-foreground hover:bg-orange-500/90 rounded-full px-8">
                REGISTER FOR AI
            </Button>
        </a>
    );
}
