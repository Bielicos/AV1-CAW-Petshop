(function () {
  const form = document.getElementById('contact_form');
  const firstName = document.getElementById('first_name_input');
  const lastName  = document.getElementById('last_name_input');
  const email     = document.getElementById('email_input');
  const message   = document.getElementById('message_textarea');

  const emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function clearError(el) {
    if (!el) return;
    el.classList.remove('input-error');
    const next = el.nextElementSibling;
    if (next && next.classList.contains('error-message')) next.remove();
    el.removeAttribute('aria-invalid');
  }

  function showError(el, text) {
    clearError(el);
    el.classList.add('input-error');
    el.setAttribute('aria-invalid', 'true');

    const p = document.createElement('p');
    p.className = 'error-message';
    p.setAttribute('role', 'alert');
    p.textContent = text;

    el.insertAdjacentElement('afterend', p);
  }

  function validateAll() {
    const errors = {};

    const f = (firstName.value || '').trim();
    const l = (lastName.value || '').trim();
    const e = (email.value || '').trim();
    const m = (message.value || '').trim();

    if (!f) errors.firstName = 'Por favor, informe seu nome.';
    if (!l) errors.lastName  = 'Por favor, informe seu sobrenome.';
    if (!e) errors.email     = 'Por favor, informe seu e-mail.';
    else if (!emailRE.test(e)) errors.email = 'Formato de e-mail inválido.';
    if (!m) errors.message   = 'Escreva sua mensagem.';
    else if (m.length < 10) errors.message = 'Mensagem muito curta (mín. 10 caracteres).';

    return { ok: Object.keys(errors).length === 0, errors };
  }

  function clearAllErrors() {
    [firstName, lastName, email, message].forEach(clearError);
  }

  function showToast(text) {
    const t = document.createElement('div');
    t.className = 'form-toast';
    t.textContent = text;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    clearAllErrors();

    const result = validateAll();
    if (!result.ok) {
      const errs = result.errors;
      if (errs.firstName) showError(firstName, errs.firstName);
      if (errs.lastName)  showError(lastName,  errs.lastName);
      if (errs.email)     showError(email,     errs.email);
      if (errs.message)   showError(message,   errs.message);

      const firstInvalid = document.querySelector('.input-error');
      if (firstInvalid) {
        firstInvalid.focus();
        firstInvalid.classList.remove('shake');
        void firstInvalid.offsetWidth;
        firstInvalid.classList.add('shake');
      }
      return;
    }

    showToast('Mensagem enviada com sucesso 🎉');
    form.reset();
  }

  if (form) {
    [firstName, lastName, email, message].forEach(el => {
      if (!el) return;
      el.addEventListener('input', () => clearError(el));
    });
    form.addEventListener('submit', handleSubmit);
  }

})();
