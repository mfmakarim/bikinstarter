// synchronize auth status to database

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { WelcomeContent } from "./components/welcome-content";

export default async function Welcome() {
  const auth = await currentUser();
  if (!auth) {
    redirect("/sign-in");
  }

  return <WelcomeContent />;
}
