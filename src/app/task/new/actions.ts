"use server"

import { TaskDefinition } from "@/types/task";
import { z } from "zod";

export async function createTaskDefinition(values: z.infer<typeof TaskDefinition>) {
    console.log(values);
}
