"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function TaskCard({
  title,
  done,
  onToggle,
}: {
  title: string;
  done: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between hover:bg-opacity-70 transition">
      <div className="flex items-center gap-3">
        <Checkbox checked={done} onCheckedChange={onToggle} />
        <span className={done ? "line-through text-gray-400" : ""}>{title}</span>
      </div>
      <Button variant="destructive" size="sm" onClick={onToggle}>
        {done ? "Undo" : "Done"}
      </Button>
    </div>
  );
}
