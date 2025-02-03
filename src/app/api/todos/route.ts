import { checkAuth } from '@/actions/auth';
import { createTodo, deleteTodo, getTodos, updateTodo } from '@/actions/todos';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await checkAuth();
    const { data, error } = await getTodos();
    
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 401 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await checkAuth();
    
    const formData = await request.formData();
    const { data, error } = await createTodo(formData);
    
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
    
    return NextResponse.json(data, { status: 201 });
  } catch(error) {
    return NextResponse.json(
      { error: 'Failed to create todo: ' + error },
      { status: 401 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await checkAuth();

    const body = await request.json();
    const todoId = body.id;
    
    if (!todoId) {
      return NextResponse.json(
        { error: 'Todo ID is required' },
        { status: 400 }
      );
    }
    const { data, error } = await updateTodo(todoId, { completed: body.completed });
    
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 401 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await checkAuth();
    const { searchParams } = new URL(request.url);
    const todoId = searchParams.get('id');
    
    if (!todoId) {
      return NextResponse.json(
        { error: 'Todo ID is required' },
        { status: 400 }
      );
    }

    const { data, error } = await deleteTodo(todoId);
    
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 401 }
    );
  }
}
