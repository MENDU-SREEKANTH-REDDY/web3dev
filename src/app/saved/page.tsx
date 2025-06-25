"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

type Task = {
  id: number;
  title: string;
  status: "todo" | "done";
};

export default function SavedTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) return;
    fetchTasks();
  }, [isSignedIn]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get<Task[]>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks`
      );
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  if (!isSignedIn) {
    return <div className="p-6 text-center">Please login to view saved tasks</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Saved Tasks</h1>
      <div className="space-y-4">
        {tasks.map((task) => (
          <Link key={task.id} href={`/tasks/${task.id}`}>
            <Card className="p-4 bg-gray-800 text-white cursor-pointer hover:bg-orange-500 hover:text-black transition duration-200">
              {task.title}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}