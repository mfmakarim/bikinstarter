import { StickyHeader } from "@/components/sticky-header";
import { currentUser } from "@clerk/nextjs/server";
import { redirect, unauthorized } from "next/navigation";
import React from "react";
import { Users, FileText, Package } from "lucide-react";
import { prisma } from "@/lib/prisma-client";

export default async function DashboardPage() {
  const auth = await currentUser();

  if (!auth) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { externalId: auth.id },
  });

  if (!user) {
    return redirect("/welcome");
  }

  if (!user.isAdmin) {
    return unauthorized()
  }

  // Fetch counts
  const [usersCount, postsCount, productsCount] = await Promise.all([
    prisma.user.count(),
    prisma.post.count(),
    prisma.product.count(),
  ]);

  return (
    <div>
      <StickyHeader title="Dashboard" />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Users Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-semibold mt-2">{usersCount}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Blog Posts Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Blog Posts</p>
                <p className="text-3xl font-semibold mt-2">{postsCount}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Products Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Products</p>
                <p className="text-3xl font-semibold mt-2">{productsCount}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
