ALTER TABLE "public"."borrow_records" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."borrow_status" CASCADE;--> statement-breakpoint
CREATE TYPE "public"."borrow_status" AS ENUM('BORROWED', 'RETURNED', 'PENDING', 'CANCELLED');--> statement-breakpoint
ALTER TABLE "public"."borrow_records" ALTER COLUMN "status" SET DATA TYPE "public"."borrow_status" USING "status"::"public"."borrow_status";