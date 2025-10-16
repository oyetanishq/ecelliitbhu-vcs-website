
import { auth } from "@/auth";
import CourseClient from "./CourseClient";

export default async function Page() {
  const session = await auth();

  let status: "no-session" | "unregistered" | "registered" = "no-session";

  if (session?.user?.email) {
    try {
      const req = await fetch(
        (process.env.NEXT_PUBLIC_BASE_URL ?? "") + "/api/user/" + session.user.email,
        { cache: "no-store" }
      );
      const res = await req.json();
      status = res?.registered_course_id ? "registered" : "unregistered";
    } catch (err) {
      console.error("Error fetching user registration:", err);
    }
  }

  return <CourseClient status={status} />;
}
