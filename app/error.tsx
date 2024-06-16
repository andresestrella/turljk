'use client'
export default function Error() {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-black">
      <h1 className="text-2xl font-light text-white">
        500 <span className="mx-3 text-4xl">|</span> Internal Server Occured
      </h1>
    </div>
  );
}
