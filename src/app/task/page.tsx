import Link from "next/link";
import { fetchTasks } from "./actions"
import { TaskDefinition } from "@/types/task";
import { Plus } from "lucide-react";

export default async function Page() {
    const rows = await fetchTasks();
    const tasks = rows.map((row) => TaskDefinition.parse(row));
    console.log(tasks);
    return (
        <div>
            <div className="border-b-gray-400 border-b-2">
                <h1 className="font-bold text-3xl p-10">Tasks</h1>
            </div>
            <div className="pt-4 flex flex-col place-items-center space-y-4">
                <Link className="flex flex-row place-items-center space-x-3 justify-center w-10/12 rounded-xl border-2 border-dashed border-gray-50 bg-gray-800 text-white font-medium p-4" href="/task/new">
                        <Plus /><p>New Task</p>
                </Link>
                {tasks.map((task, idx) => (<>
                    <div className="w-10/12 rounded-xl border-2 border-gray-50 bg-gray-300 text-black font-medium p-4" key={idx}>
                        <Link href={`task/${idx}`}>
                            {task.prompt}
                        </Link>
                    </div>
                </>))}
            </div>
        </div>
    )
}
