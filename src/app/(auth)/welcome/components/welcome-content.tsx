"use client";

import { fetcher } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import useSWR from "swr";

export const WelcomeContent = () => {
  const { data } = useSWR("/api/users", fetcher, {
    onError: (error) => {
      toast.error("Failed to synce: " + error);
    },
  });

  if (data?.id) {
    redirect("/todos");
  }

  return (
    <div className="flex w-full flex-1 items-center justify-center px-4 h-[calc(100vh-4rem)]">
      <div className="relative z-10 flex -translate-y-1/2 flex-col items-center gap-4 text-center">
        <Loader2 className="animate-spin size-8" />
        <h1 className="text-4xl font-bold mt-10">Selamat Datang 🎉</h1>
        <p className="text-base/7 text-gray-600 max-w-prose">
          Kami sedang menyiapkan akun Anda.
        </p>
      </div>
    </div>
  );
};
