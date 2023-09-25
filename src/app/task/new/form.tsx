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
import { myAction } from "./actions";
import { Textarea } from "@/components/ui/textarea";
import { useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

export function TaskForm() {
    const form = useForm<z.infer<typeof TaskDefinition>>({
        resolver: zodResolver(TaskDefinition),
        defaultValues: {
            //            params: [{value: ""}]
        }
    });

    const { fields, append } = useFieldArray({
        name: "params",
        control: form.control
    });

    function onSubmit(values: z.infer<typeof TaskDefinition>) {
        console.log(values);
        myAction(values);
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
                        <FormLabel>Parameters</FormLabel>
                        <FormDescription>
                            Add parameters to control the response of this task.
                        </FormDescription>
                        {fields.map((field, index) => (
                            <FormField
                                control={form.control}
                                key={field.id}
                                name={`params.${index}.value`}
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
                        onClick={() => append({ value: "" })}
                    >
                        <Plus />
                    </Button>
                </div>
                <Button type="submit">Create</Button>
            </form>
        </Form >
    );
}

