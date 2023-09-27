ALTER TABLE TaskDefinition ADD `inputParameters` text;--> statement-breakpoint
ALTER TABLE TaskDefinition ADD `outputParameters` text;--> statement-breakpoint
ALTER TABLE `TaskDefinition` DROP COLUMN `parameters`;