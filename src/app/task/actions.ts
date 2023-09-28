"use server"

import { createClient } from "@libsql/client";
import { currentUser } from "@clerk/nextjs/server";
import { TaskDefinition } from "@/types/task";

export async function fetchTasks() {
    const user = await currentUser()
    const userId = user?.id;

    const query = "SELECT rowId, prompt, json(inputParameters) as inputParameters, json(outputParameters) as outputParameters FROM TaskDefinition WHERE userId = ?";
    const client = createClient({
        url: process.env.TURSO_URL!,
        authToken: process.env.TURSO_SECRET!,
    });
    const rows = await client.execute({ sql: query, args: [userId!] });
    const returnArray = rows.rows.map((row) => {
        const result = {
            prompt: row["prompt"]?.toString() || '',
            inputParams: JSON.parse(row["inputParameters"]?.toString() || ''),
            outputParams: JSON.parse(row["outputParameters"]?.toString() || ''),
        };
        return TaskDefinition.parse(result);
    });
    return returnArray;
}
