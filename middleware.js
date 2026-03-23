import { get } from '@vercel/edge-config';

export const config = {
  matcher: '/test-edge-config',
};

export async function middleware(request) {
  try {
    const greeting = await get('greeting');
    return new Response(JSON.stringify({ greeting: greeting || 'Greeting not found' }), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}

