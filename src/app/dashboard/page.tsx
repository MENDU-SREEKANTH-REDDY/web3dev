"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function Dashboard() {
  const [topic, setTopic] = useState("");
  const [tasks, setTasks] = useState<
    { title: string; done: boolean; saved?: boolean }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);

    const generated = [
      `Understand basics of ${topic}`,
      `Watch a short video on ${topic}`,
      `Build a tiny project using ${topic}`,
      `Read an article about ${topic}`,
      `Summarize what you've learned in ${topic}`,
    ];

    const newTasks = generated.map((t) => ({
      title: t,
      done: false,
      saved: false,
    }));

    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setLoading(false);
  };

  const handleSave = async (index: number) => {
    const task = tasks[index];
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks`, {
        title: task.title,
        status: task.done ? "done" : "todo",
      });

      const updated = [...tasks];
      updated[index].saved = true;
      setTasks(updated);
    } catch (err) {
      console.error("Error saving task:", err);
      alert("Failed to save task.");
    }
  };

  const toggleDone = (index: number) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  return (
    <div className="max-w-xl mx-auto p-4 pt-24 text-white">
      <h1 className="text-3xl font-bold mb-4">Generate Tasks</h1>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Enter a topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button onClick={handleGenerate} disabled={loading}>
          {loading ? "Fetching..." : "Generate"}
        </Button>
      </div>

      <div className="space-y-2">
        {tasks.map((task, i) => (
          <div
            key={i}
            className="bg-[#1e293b] px-4 py-3 rounded-lg flex justify-between items-center"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(i)}
              />
              <span className={task.done ? "line-through" : ""}>{task.title}</span>
            </div>

            <div className="flex gap-2">
              {!task.saved ? (
                <button
                  onClick={() => handleSave(i)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                >
                  Save
                </button>
              ) : (
                <span className="text-green-400 font-medium text-sm">Saved</span>
              )}

              <button
                onClick={() => toggleDone(i)}
                className={`px-3 py-1 rounded text-sm ${
                  task.done
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "bg-red-600 hover:bg-red-700"
                } text-white`}
              >
                {task.done ? "Undo" : "Done"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
