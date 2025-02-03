export const StickyHeader = ({
    title
}: {
    title: string
}) => {
  return (
    <div className="sticky top-16 bg-white border-b border-zinc-200">
      <div className="container px-4 py-4">
        <h1 className="text-xl font-light">{title}</h1>
      </div>
    </div>
  );
};
