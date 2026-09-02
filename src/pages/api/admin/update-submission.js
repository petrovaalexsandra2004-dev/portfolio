export const prerender = false;

function isAuthed(cookies) {
  const adminPass = import.meta.env.ADMIN_PASSWORD;
  return adminPass && cookies.get('admin_auth')?.value === adminPass;
}

export async function POST({ request, cookies }) {
  if (!isAuthed(cookies)) {
    return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body = {};
  try { body = await request.json(); } catch {}

  const { id, status } = body;
  if (!id || !['new', 'seen', 'done'].includes(status)) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid params' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { getWriteClient } = await import('../../../sanity/client.js');
    const client = getWriteClient();
    await client.patch(id).set({ status }).commit();
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
