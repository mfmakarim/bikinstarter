'use client';

import { deleteTodo, updateTodo } from "@/actions/todos";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TrashIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

interface Todo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
}

export default function TodoList({ todos }: { todos: Todo[] }) {
  const handleToggleTodo = async (todo: Todo) => {
      const { data } = await updateTodo(todo.id, { completed: !todo.completed });

      if(data){
        toast.success("Todo updated successfully");
      }
  }

  const handleDeleteTodo = async (todoId: string) => {
    const { data } = await deleteTodo(todoId);

    if(data){
      toast.success("Todo deleted successfully");
    }
  }
 

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between p-4 border rounded-lg"
        >
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => handleToggleTodo(todo)}
            />
            <div>
              <p
                className={`font-medium ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.title}
              </p>
              {todo.description && (
                <p className="text-sm text-gray-500">{todo.description}</p>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      {todos.length === 0 && (
        <p className="text-center text-gray-500">No todos yet</p>
      )}
    </div>
  );
} 