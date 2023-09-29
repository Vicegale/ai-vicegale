"use client"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { TaskDefinition } from "@/types/task";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createTaskDefinition } from "./actions";
import { Textarea } from "@/components/ui/textarea";
import { useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

export function TaskForm() {
    const form = useForm<z.infer<typeof TaskDefinition>>({
        resolver: zodResolver(TaskDefinition),
        defaultValues: {
        }
    });

    const inputParamsFieldArray = useFieldArray({
        name: "inputParams",
        control: form.control
    });

    const outputParamsFieldArray = useFieldArray({
        name: "outputParams",
        control: form.control
    });

    async function onSubmit(values: z.infer<typeof TaskDefinition>) {
        console.log(values);
        const newTaskId = await createTaskDefinition(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prompt</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Write an email response" {...field} />
                            </FormControl>
                            <FormDescription>
                                The prompt for this task.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />
                <div>
                    <FormItem>
                        <FormLabel>Input Parameters</FormLabel>
                        <FormDescription>
                            Add parameters to control the response of this task.
                        </FormDescription>
                        {inputParamsFieldArray.fields.map((field, index) => (
                            <FormField
                                control={form.control}
                                key={field.id}
                                name={`inputParams.${index}.value`}
                                render={({ field }) => (
                                    <>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </>
                                )}
                            />
                        ))}
                    </FormItem>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => inputParamsFieldArray.append({ value: "" })}
                    >
                        <Plus />
                    </Button>
                </div>
                <div>
                    <FormItem>
                        <FormLabel>Output Parameters</FormLabel>
                        <FormDescription>
                            Add parameters the model should output in its JSON response.
                        </FormDescription>
                        {outputParamsFieldArray.fields.map((field, index) => (
                            <FormField
                                control={form.control}
                                key={field.id}
                                name={`outputParams.${index}.value`}
                                render={({ field }) => (
                                    <>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </>
                                )}
                            />
                        ))}
                    </FormItem>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => outputParamsFieldArray.append({ value: "" })}
                    >
                        <Plus />
                    </Button>
                </div>
                <Button type="submit">Create</Button>
            </form>
        </Form >
    );
}

