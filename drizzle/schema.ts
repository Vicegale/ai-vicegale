import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export var TaskDefinition = sqliteTable("TaskDefinition", {
    userId: text("userId"),
    prompt: text("prompt"),
    parameters: text("parameters", { mode: 'json' }),
}
);
