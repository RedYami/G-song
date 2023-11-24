import Image from "next/image";

export default function SomethingLoading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed top-0 right-0 z-50 w-full h-full flex flex-col justify-center items-center backdrop-brightness-50">
      <Image
        src={"/w_icon.png"}
        width={100}
        height={100}
        alt="loading image"
        className=" animate-pulse "
        priority
      />
      {children}
    </div>
  );
}
