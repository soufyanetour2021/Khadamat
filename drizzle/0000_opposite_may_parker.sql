CREATE TABLE `consultation_images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`consultation_id` int NOT NULL,
	`image_url` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `consultation_images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `consultations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`full_name` varchar(255) NOT NULL,
	`phone` varchar(50) NOT NULL,
	`city` varchar(100) NOT NULL,
	`address` text NOT NULL,
	`service_type` varchar(100) NOT NULL,
	`problem_description` text NOT NULL,
	`urgency` enum('normal','urgent','very_urgent') NOT NULL DEFAULT 'normal',
	`status` enum('pending','reviewing','quoted','scheduled','in_progress','completed','cancelled') NOT NULL DEFAULT 'pending',
	`estimated_cost` decimal(10,2),
	`estimated_duration` varchar(100),
	`required_materials` text,
	`scheduled_date` timestamp,
	`assigned_technician_id` int,
	`latitude` decimal(10,8),
	`longitude` decimal(11,8),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `consultations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`title_ar` varchar(255) NOT NULL,
	`message_ar` text NOT NULL,
	`is_read` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ratings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`consultation_id` int NOT NULL,
	`user_id` int NOT NULL,
	`quality_rating` int NOT NULL,
	`speed_rating` int NOT NULL,
	`treatment_rating` int NOT NULL,
	`comment` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `ratings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `service_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name_ar` varchar(255) NOT NULL,
	`icon` varchar(100) NOT NULL,
	`description` text,
	CONSTRAINT `service_categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category_id` int NOT NULL,
	`name_ar` varchar(255) NOT NULL,
	`description_ar` text,
	`base_price` decimal(10,2),
	CONSTRAINT `services_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`full_name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(50),
	`password_hash` varchar(255),
	`role` enum('customer','admin','technician') NOT NULL DEFAULT 'customer',
	`provider` enum('local','google','facebook','apple') NOT NULL DEFAULT 'local',
	`is_blocked` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
