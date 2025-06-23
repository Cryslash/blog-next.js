PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`password` text NOT NULL,
	`user_type` text DEFAULT 'author' NOT NULL,
	`isActive` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "name", "password", "user_type", "isActive") SELECT "id", "name", "password", "user_type", "isActive" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `users_name_unique` ON `users` (`name`);