"use client"

import { useEffect, useState } from "react"
import { getTaskDefinition } from "./actions";
import { TaskDefinition } from "@/types/task";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";

type Mode = "DISPLAY" | "EDIT";

export default function TaskDisplay(props: { id: number }) {
    const [task, setTask] = useState<z.infer<typeof TaskDefinition>>();
    const [mode, setMode] = useState<Mode>("DISPLAY");
    const [inputs, setInputs] = useState<Map<string, string>>(new Map<string, string>());
    const [taskInput, setTaskInput] = useState<string>('');

    useEffect(() => {
        const definition = getTaskDefinition(props.id);
        definition.then((res) => {
            setTask(res);
        });
    }, []);

    function setEdit() {
        setMode("EDIT");
        setInputs(new Map<string, string>());
    }
    function setDisplay() {
        setMode("DISPLAY");
        setInputs(new Map<string, string>());
    }

    function launch() {
        console.log("Launch", inputs, taskInput);
    }

    function updateFormInputs(key: string, value: string) {
        console.log("Updating k, v:", key, value);
        const temp = inputs;
        temp.set(key, value);
        setInputs(temp);
    }
    return (
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Task Definition</h2>
            <div className="mb-4">
                <p className="text-gray-400 text-lg">Prompt:</p>
                <p className="text-xl font-semibold">{task?.prompt}</p>
            </div>
            <div className="flex flex-row">
                <div className="w-1/2 pr-4">
                    <p className="text-gray-400 text-lg">Input Parameters:</p>
                    <ul className="list-disc pl-6">
                        {mode == "DISPLAY" && task?.inputParams.map((i, idx) => <li key={idx}>{i.value}</li>)}
                        {mode == "EDIT" && task?.inputParams.map((i, idx) => <><input onChange={(e) => updateFormInputs(i.value, e.target.value)} type="text" key={idx} placeholder={i.value} /><br/></>)}
                    </ul>
                </div>
                <div className="w-1/2">
                    <p className="text-gray-400 text-lg">Output Parameters:</p>
                    <ul className="list-disc pl-6">
                        {task?.outputParams.map((i, idx) => <li key={idx}>{i.value}</li>)}
                    </ul>
                </div>
            </div>
            {mode === "EDIT" &&
                <div className="">
                    <h2 className="text-gray-400 text-lg">Input</h2>
                    <Textarea onChange={(e) => setTaskInput(e.target.value)} />
                </div>
            }
            {mode === "EDIT" &&
            <div className="">
                <h2 className="text-gray-400 text-lg">Output</h2>
                <Textarea disabled onChange={(e) => setTaskInput(e.target.value)} />
            </div>
            }
            <div className="flex justify-end mt-6">
                {mode === "EDIT" && <button onClick={setDisplay} className="bg-gray-400 text-black hover:bg-gray-300 font-semibold py-2 px-4 rounded-md">Back</button>}
                <button onClick={mode === "DISPLAY" ? setEdit : launch} className="bg-white text-gray-800 hover:bg-gray-300 font-semibold py-2 px-4 rounded-md">
                    Launch
                </button>
            </div>
        </div>
    );
}
