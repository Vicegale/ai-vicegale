import { text, sqliteTable, int } from "drizzle-orm/sqlite-core";

export var TaskDefinition = sqliteTable("TaskDefinition", {
    id: int("id").primaryKey(),
    userId: text("userId"),
    prompt: text("prompt"),
    inputParameters: text("inputParameters", { mode: 'json' }),
    outputParameters: text("outputParameters", { mode: 'json' })
}
);
