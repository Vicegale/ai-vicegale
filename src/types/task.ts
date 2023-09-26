import { z } from "zod";

export const TaskDefinition = z.object({
    "prompt": z.string(),
    "inputParams": z.array(z.object({value:z.string()})),
    "outputParams": z.array(z.object({value:z.string()})) 
});
