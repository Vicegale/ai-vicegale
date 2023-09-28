"use server"

import { TaskDefinition } from "@/types/task";
import { createClient } from "@libsql/client";
import { z } from "zod";

export async function getTaskDefinition(id: number): Promise<z.infer<typeof TaskDefinition> | undefined> {
    const query = "SELECT prompt, json(inputParameters) as inputParameters, json(outputParameters) as outputParameters FROM TaskDefinition WHERE rowid = ?";

    const client = createClient({
        url: process.env.TURSO_URL!,
        authToken: process.env.TURSO_SECRET!,
    });

    const rs = await client.execute({
        sql: query,
        args: [id],
    });
    if(rs.rows[0]) {
        const result = {
            prompt: rs.rows[0]["prompt"]?.toString() || '',
            inputParams: JSON.parse(rs.rows[0]["inputParameters"]?.toString() || ''),
            outputParams: JSON.parse(rs.rows[0]["outputParameters"]?.toString() || ''),

        };
        console.log(result);
        return TaskDefinition.parse(result);
    }
    return undefined;
}
