import { ModeToggle } from "@/components/ui/theme-toggle";
import { TaskForm } from "./form";
export default function Page() {
    return (
        <div>
            <ModeToggle />
            <div className="w-full p-10 justify-center border-solid border-primary border-2 rounded-xl gap-4">
                <TaskForm />
            </div>
        </div>
    )
}
