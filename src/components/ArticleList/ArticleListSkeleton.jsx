export default function ArticleListSkeleton() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 w-full">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse p-6 border rounded shadow-md w-full h-full min-h-[500px] lg:min-h-[600px] "
        >
          <div className="h-4/6 w-full bg-gray-300 rounded mb-4"></div>
          <div className="h-6 w-full bg-gray-300 rounded mb-2"></div>
          <div className="h-6 w-full bg-gray-300 rounded mb-2"></div>
          <div className="h-6 w-full bg-gray-300 rounded mb-2"></div>
          <div className="h-6 w-full bg-gray-300 rounded mb-2"></div>
        </div>
      ))}
    </div>
  );
}
