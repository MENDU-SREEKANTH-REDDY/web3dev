import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-black text-white">
      <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-orange-300 to-black text-transparent bg-clip-text">
        Welcome to{" "}
        <span className="bg-gradient-to-r from-orange-400 to-orange-300 text-transparent bg-clip-text">
          WEB3DEV
        </span>
      </h1>

      <p className="mb-6 text-lg text-gray-300">
        Generate actionable tasks from any topic using AI
      </p>

      <Link href="/dashboard">
        <Button
          className="bg-gradient-to-r from-black to-orange-500 text-white border border-white border-opacity-30 hover:opacity-90 transform hover:scale-105 transition duration-200 px-6 py-2 rounded"
        >
          Get Started
        </Button>
      </Link>
    </main>
  );
}
