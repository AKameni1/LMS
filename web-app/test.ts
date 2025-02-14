/**
 * @file This script is used to test the insertion of a book record into the database.
 *
 * It uses the `neon` library to connect to a serverless database and the `drizzle-orm` library
 * to interact with the database. The database connection details are loaded from a `.env.local` file.
 *
 * The `run` function inserts a new book record into the `books` table with predefined values.
 *
 * @module TestInsertion
 */

import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { books } from './db/schema';

config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

async function run() {
  await db.insert(books).values({
    title: 'Book Title',
    author: 'Book Author',
    genre: 'Fiction',
    rating: 4.5,
    totalCopies: 5,
    availableCopies: 5,
    description: 'This is a book description.',
    coverColor: '#FFFFFF',
    coverUrl: 'cover.jpg',
    videoUrl: 'video.mp4',
    summary: 'This is the book summary.',
  });
}

run();
