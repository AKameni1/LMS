import { sql } from 'drizzle-orm';
import {
  integer,
  text,
  pgTable,
  uuid,
  varchar,
  pgEnum,
  date,
  timestamp,
  real,
  customType,
  index,
} from 'drizzle-orm/pg-core';

const tsVector = customType<{ data: string }>({
  dataType() {
    return 'tsvector';
  },
});

export const STATUS = pgEnum('status', ['PENDING', 'APPROVED', 'REJECTED']);
export const ROLE = pgEnum('role', ['USER', 'ADMIN']);
export const BORROW_STATUS = pgEnum('borrow_status', ['BORROWED', 'RETURNED']);

export const users = pgTable('users', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: text('email').notNull().unique(),
  universityId: integer('university_id').notNull().unique(),
  password: text('password').notNull(),
  universityCard: text('university_card').notNull(),
  status: STATUS('status').notNull().default('PENDING'),
  role: ROLE('role').notNull().default('USER'),
  lastActivityDate: date('last_activity_date').defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const books = pgTable(
  'books',
  {
    id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
    title: varchar('title', { length: 255 }).notNull(),
    author: varchar('author', { length: 255 }).notNull(),
    genre: text('genre').notNull(),
    rating: real('rating').notNull(),
    totalCopies: integer('total_copies').notNull().default(1),
    availableCopies: integer('available_copies').notNull().default(0),
    description: text('description').notNull(),
    coverColor: varchar('cover_color', { length: 7 }).notNull(),
    coverUrl: text('cover_url').notNull(),
    videoUrl: text('video_url').notNull(),
    summary: varchar('summary').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),

    // Full text search
    searchText: tsVector('search_text')
      .generatedAlwaysAs(
        sql`
          to_tsvector(
            'english',
            coalesce(title, '') || ' ' || 
            coalesce(author, '') || ' ' || 
            coalesce(genre, '') || ' ' || 
            coalesce(description, '') || ' ' || 
            coalesce(summary, '')
          )
        `,
      )
      .$onUpdateFn(
        () =>
          sql`
          to_tsvector(
            'english',
            coalesce(title, '') || ' ' || 
            coalesce(author, '') || ' ' || 
            coalesce(genre, '') || ' ' || 
            coalesce(description, '') || ' ' || 
            coalesce(summary, '')
          )
        `,
      ),
  },
  (book) => [
    // Index GIN for full text search
    index('idx_books_search')
      .using('gin', book.searchText)
      .with({ fastupdate: true }),
  ],
);

export const borrowRecords = pgTable('borrow_records', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  bookId: uuid('book_id')
    .references(() => books.id)
    .notNull(),
  borrowDate: timestamp('borrow_date', { withTimezone: true })
    .defaultNow()
    .notNull(),
  dueDate: date('due_date').notNull(),
  returnDate: date('return_date'),
  status: BORROW_STATUS('status').default('BORROWED').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
