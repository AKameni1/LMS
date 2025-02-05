ALTER TABLE "books" ADD COLUMN "search_text" "tsvector" GENERATED ALWAYS AS (
          to_tsvector(
            'english',
            coalesce(title, '') || ' ' || 
            coalesce(author, '') || ' ' || 
            coalesce(genre, '') || ' ' || 
            coalesce(description, '') || ' ' || 
            coalesce(summary, '')
          )
        ) STORED;--> statement-breakpoint
CREATE INDEX "idx_books_search" ON "books" USING gin ("search_text") WITH (fastupdate=true);