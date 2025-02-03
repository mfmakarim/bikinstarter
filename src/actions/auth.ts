import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma-client";

export const checkAuth = async () => {
  const auth = await currentUser();

  if (!auth) {
    throw new Error("Unauthorized");
  }

  return auth;
};

export const checkAuthAndGetUser = async () => {
  const auth = await checkAuth();
  const user = await prisma.user.findUnique({
    where: { externalId: auth.id },
  });

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
};

export const syncUser = async () => {
  const auth = await checkAuth();

  const user = await prisma.user.findUnique({
    where: { externalId: auth.id },
  });

  if (user) {
    return { data: user };
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        externalId: auth.id,
        email: auth.emailAddresses[0].emailAddress,
        name: auth.fullName
      },
    });
    return { data: newUser };
  } catch (error) {
    console.log(error)
    return { error: "Failed to sync user" };
  }
}

