"use server"

import { TaskDefinition } from "@/types/task";
import { z } from "zod";
import { sql } from '@vercel/postgres';

export async function createTaskDefinition(values: z.infer<typeof TaskDefinition>) {
    console.log(values);
    const q = `INSERT INTO TaskDefinition (id, prompt, params) VALUES (1, '${values.prompt}', '${JSON.stringify(values.params)}'::json)`;
    console.log(q);
    await sql`${q}`
}
