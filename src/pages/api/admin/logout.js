export const prerender = false;

export async function POST({ cookies }) {
  cookies.delete('admin_auth', { path: '/' });
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
