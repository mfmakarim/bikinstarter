'use client';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { fetcher } from "@/lib/utils";
import { TrashIcon } from "@radix-ui/react-icons";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { deleteTodo, updateTodo } from "../mutation";
import { useState } from "react";

interface Todo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
}

export default function TodoList() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data:todos, error, isLoading:loading } = useSWR('/api/todos', fetcher)

  const { trigger: handleUpdateTodo, isMutating } = useSWRMutation('/api/todos', updateTodo, {
    onSuccess: () => {
      mutate('/api/todos');
      toast.success("Todo updated successfully");
      setSelectedId(null);
    },
    onError: (error) => {
      toast.error("Something went wrong: " + error);
      setSelectedId(null);
    },
  })

  const { trigger: handleDeleteTodo, isMutating: deleting } = useSWRMutation('/api/todos', deleteTodo, {
    onSuccess: () => {
      mutate('/api/todos');
      toast.success("Todo deleted successfully");
      setSelectedId(null);
    },
    onError: (error) => {
      toast.error("Something went wrong: " + error);
      setSelectedId(null);
    },
  })

  if(error) {
    return <div>Failed to load todos</div>
  }


  if (loading) {
    return <div>Loading...</div>;
  }
 

  return (
    <div className="space-y-4 relative">
      {todos.map((todo:Todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between p-4 border rounded-lg"
        >
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => {
                setSelectedId(todo.id);
                handleUpdateTodo({
                  id: todo.id, 
                  completed: !todo.completed
                })
            }}
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
            {(isMutating || deleting) && selectedId === todo.id && (
              <Loader2Icon className="size-4 animate-spin" />
            )}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setSelectedId(todo.id);
                handleDeleteTodo({
                  id: todo.id
                })
              }}
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