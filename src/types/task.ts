import { z } from "zod";

export const task = z.object({
    "prompt": z.string(),
    "input": z.string(),
    "params": z.object({})
});
