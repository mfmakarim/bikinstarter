import { checkAuth, syncUser } from "@/actions/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await checkAuth();
    const { data, error } = await syncUser();

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to sync user" },
      { status: 401 }
    );
  }
}
