import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-10 mt-10 ">
      <button className="bg-pink-100 rounded-md w-44 p-5">
        <Link href="/home">Click here to go to Principal</Link>
      </button>
      <button className="bg-pink-100 rounded-md w-44 p-5">
        <a href="http://localhost:4000/auth/google">Login with google</a>
      </button>
      <button className="bg-pink-100 rounded-md w-44 p-5">
        <a href="http://localhost:4000/auth/facebook">Login with facebook</a>
      </button>
      <button className="bg-pink-100 rounded-md w-44 p-5">
        <Link href="/products">Go to products</Link>
      </button>
    </div>
  );
}
