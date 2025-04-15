import config from '@/lib/config';
import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
  const sql = neon(config.env.databaseUrl);
  const {
    title,
    author,
    genre,
    rating,
    total_copies,
    available_copies,
    description,
    cover_color,
    cover_url,
    video_url,
    summary,
  } = await request.json();

  if (
    !title ||
    !author ||
    !genre ||
    !rating ||
    !total_copies ||
    !available_copies ||
    !description ||
    !cover_color ||
    !cover_url ||
    !video_url ||
    !summary
  ) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const response = await sql`
      INSERT INTO books (
        id
        title,
        author,
        genre,
        rating,
        total_copies,
        available_copies,
        description,
        cover_color,
        cover_url,
        video_url,
        summary
      )
      VALUES (
        uuid_generate_v4(),
        ${title},
        ${author},
        ${genre},
        ${rating},
        ${total_copies},
        ${available_copies},
        ${description},
        ${cover_color},
        ${cover_url},
        ${video_url},
        ${summary}
      )
      RETURNING *
    `;

    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return Response.json({ error }, { status: 500 });
  }
}
