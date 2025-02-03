import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk",
  description: "Masuk ke akun BikinStarter",
};

export default function Page() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <SignIn />
    </div>
  );
}
