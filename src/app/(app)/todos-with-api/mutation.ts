export const createTodo = async (
  url: string,
  { arg }: { arg: { title: string; description?: string } }
) => {
  const formData = new FormData();
  formData.append("title", arg.title);
  if (arg.description) {
    formData.append("description", arg.description);
  }
  await fetch(url, {
    method: "POST",
    body: formData,
  });
}

export const updateTodo = async (
  url: string,
  { arg }: { arg: { id: string; completed?: boolean } }
) => {
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...arg }),
  });
};

export const deleteTodo = async (
  url: string,
  { arg }: { arg: { id: string } }
) => {
  await fetch(`${url}?id=${arg.id}`, { method: "DELETE" });
};
