export default function SomethingLoading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed top-0 right-0 z-50 w-full h-full flex justify-center items-center backdrop-blur-lg">
      {children}
    </div>
  );
}
