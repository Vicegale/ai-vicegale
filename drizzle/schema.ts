import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export var TaskDefinition = sqliteTable("TaskDefinition", {
    userId: text("userId"),
    prompt: text("prompt"),
    inputParameters: text("inputParameters", { mode: 'json' }),
    outputParameters: text("outputParameters", { mode: 'json' })
}
);
