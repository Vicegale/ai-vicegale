import { fetchTasks } from "./actions"
import { TaskDefinition } from "@/types/task";

export default async function Page() {
    const rows = await fetchTasks();
    const tasks = rows.map((row) => TaskDefinition.parse(row));
    console.log(tasks);
    return (
    <div>
        <h1>Tasks</h1>
        <ul>
            {tasks.map((task, idx) => (<>
                <a href={`task/${idx}`} key={idx}>{task.prompt}</a><br />
            </>))}
        </ul>
    </div>
    )
}
