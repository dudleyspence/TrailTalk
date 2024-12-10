export default function TopicsSkeleton() {
  return (
    <div className="flex flex-row justify-evenly w-full mt-10 mb-5">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse w-16 h-6 bg-gray-300 rounded"
        ></div>
      ))}
    </div>
  );
}
