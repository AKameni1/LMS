import config from '@/lib/config';
import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
  const sql = neon(config.env.databaseUrl);
  const { name, email, clerkId } = await request.json();

  if (!name || !email || !clerkId) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }
  try {
    const response = await sql`
    INSERT INTO users (name, email, clerk_id)
    VALUES (${name}, ${email}, ${clerkId})
    RETURNING *
  `;

    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return Response.json({ error }, { status: 500 });
  }
}
