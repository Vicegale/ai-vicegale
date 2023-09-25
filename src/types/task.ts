import { z } from "zod";

export const TaskDefinition = z.object({
    "prompt": z.string(),
    "params": z.array(z.object({value:z.string()})) 
});
