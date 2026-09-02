export const prerender = false;

export async function POST({ request, cookies }) {
  let body = {};
  try { body = await request.json(); } catch {}

  const { password } = body;
  const adminPass = import.meta.env.ADMIN_PASSWORD;

  if (!adminPass || password !== adminPass) {
    return new Response(JSON.stringify({ ok: false, error: 'Неверный пароль' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  cookies.set('admin_auth', adminPass, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
