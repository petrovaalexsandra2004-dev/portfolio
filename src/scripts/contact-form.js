const form = document.getElementById('contact-form');

if (form) {
  const submitBtn = form.querySelector('[type="submit"]');
  const lang = document.documentElement.lang ?? 'ru';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();

    if (!name || !email || !message) return;

    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = submitBtn.dataset.sending ?? 'Отправляю...';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, lang }),
      });

      if (res.ok) {
        showMessage(form, 'success', submitBtn.dataset.success ?? 'Заявка отправлена!');
        form.reset();
      } else {
        throw new Error('Server error');
      }
    } catch {
      showMessage(form, 'error', submitBtn.dataset.error ?? 'Что-то пошло не так. Напиши в Telegram.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

function showMessage(form, type, text) {
  let msg = form.querySelector('.form-message');
  if (!msg) {
    msg = document.createElement('p');
    msg.className = 'form-message';
    form.appendChild(msg);
  }
  msg.textContent = text;
  msg.dataset.type = type;
  msg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  setTimeout(() => msg.remove(), 6000);
}
