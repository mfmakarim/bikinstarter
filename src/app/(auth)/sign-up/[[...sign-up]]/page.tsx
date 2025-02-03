import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar",
  description: "Daftar ke akun BikinStarter",
};

export default function Page() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <SignUp />
    </div>
  );
}
