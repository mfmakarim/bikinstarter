import { Suspense } from "react";
import AddTodoForm from "./components/add-todo-form";
import TodoList from "./components/todo-list";

export default function TodosWithApiPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Todos</h1>
        <AddTodoForm />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <TodoList />
      </Suspense>
    </div>
  );
}
