'use server';

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { checkAuth, checkAuthAndGetUser } from "./auth";
import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export const getTodos = async () => {
  try {
    const user = await checkAuthAndGetUser();

    const todos = await prisma.todo.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return { data: todos };
  } catch (error) {
    console.log(error)
    return { error: "Failed to fetch todos" };
  }
}

export const createTodo = async (formData: FormData) => {
  try {
    const user = await checkAuthAndGetUser();

    const title = formData.get("title");
    const description = formData.get("description");

    if (!title || typeof title !== 'string') {
      throw new Error("Title is required");
    }

    const todo = await prisma.todo.create({
      data: {
        title,
        description: description?.toString() || '',
        userId: user.id,
      }
    });

    revalidatePath('/todos');
    return { data: todo };
  } catch (error) {
    console.log(error)
    return { error: "Failed to create todo" };
  }
}

export const updateTodo = async (todoId: string, data: { completed?: boolean; title?: string; description?: string }) => {
  try {
    await checkAuth()
    
    const todo = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data
    });

    revalidatePath('/todos');
    return { data: todo };
  } catch (error) {
    console.log(error);
    return { error: "Failed to update todo" };
  }
}

export const deleteTodo = async (todoId: string) => {
  try {
    const user = await checkAuthAndGetUser()

    const todo = await prisma.todo.delete({
      where: {
        id: todoId
      },
    });

    // send email
    await resend.emails.send({
        from: 'BikinStarter <starter@bikinsaas.id>',
        to: [`${user.email}`],
        subject: 'Hello world',
        react: await EmailTemplate({ firstName: `${user.name}` }),
    });

    revalidatePath('/todos');
    return { data: todo };
  } catch (error) {
    console.log(error);
    return { error: "Failed to delete todo" };
  }
} 