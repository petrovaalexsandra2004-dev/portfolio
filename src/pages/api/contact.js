export const prerender = false;

export async function POST({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { name, email, message, lang } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing fields' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Простая проверка email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid email' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
  const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
  const token = import.meta.env.SANITY_API_TOKEN;

  if (projectId && token) {
    try {
      const { getWriteClient } = await import('../../sanity/client.js');
      const client = getWriteClient();
      await client.create({
        _type: 'contactSubmission',
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        lang: lang ?? 'ru',
        status: 'new',
      });
    } catch (err) {
      console.error('Sanity write error:', err);
      // Не возвращаем 500 — лучше пусть форма покажет успех и письмо придёт
    }
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
