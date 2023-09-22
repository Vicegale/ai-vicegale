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
import { Input } from "@/components/ui/input"
import { task } from "@/types/task";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export function TaskForm() {
    const form = useForm<z.infer<typeof task>>({
        resolver: zodResolver(task),
        defaultValues: {
        }
    });
    function onSubmit(values: z.infer<typeof task>) {
        console.log(values);
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
                                <Input placeholder="Write an email response" {...field} />
                            </FormControl>
                            <FormDescription>
                                The prompt for this task.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Button type="submit">Create</Button>
            </form>
        </Form>
    );
}

