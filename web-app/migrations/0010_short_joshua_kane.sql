CREATE TABLE "favorite_books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"book_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "favorite_books_id_unique" UNIQUE("id"),
	CONSTRAINT "uni" UNIQUE("user_id","book_id")
);
--> statement-breakpoint
ALTER TABLE "favorite_books" ADD CONSTRAINT "favorite_books_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite_books" ADD CONSTRAINT "favorite_books_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;