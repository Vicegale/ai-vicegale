"use server"

import { TaskDefinition } from "@/types/task";
import { z } from "zod";
import { createClient } from "@libsql/client";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation"

export async function createTaskDefinition(values: z.infer<typeof TaskDefinition>) {
    const user = await currentUser();
    const userId = user?.id;
    console.log(userId);
    console.log(values);
    const q = `INSERT INTO TaskDefinition (userId, prompt, inputParameters, outputParameters) VALUES ('${userId}', '${values.prompt}', json('${JSON.stringify(values.inputParams)}'), json('${JSON.stringify(values.outputParams)}'))`;
    console.log(q);
    const client = createClient({
        url: process.env.TURSO_URL!,
        authToken: process.env.TURSO_SECRET!,
    }); 
    const result = await client.execute(q);
    redirect("/task/"+result.lastInsertRowid);
}
