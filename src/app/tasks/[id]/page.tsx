import { notFound } from "next/navigation";
import axios from "axios";

type Task = {
  id: number;
  title: string;
  status: string;
};

export default async function TaskDetail({ params }: { params: { id: string } }) {
  try {
    const res = await axios.get<Task[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`);
    const task = res.data.find((t) => t.id === Number(params.id));

    if (!task) return notFound();

    return (
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Task Details</h1>
        <div className="bg-gray-900 text-white p-4 rounded-lg space-y-2">
          <div><strong>ID:</strong> {task.id}</div>
          <div><strong>Title:</strong> {task.title}</div>
          <div><strong>Status:</strong> {task.status}</div>
        </div>
      </div>
    );
  } catch (err) {
    return notFound();
  }
}
