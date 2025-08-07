import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to dashboard as main entry point
  redirect("/dashboard");
}
