
const header = document.querySelector('.header');
const toggle = document.querySelector('.mobile-toggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
const inquiryEmail = 'daniel@medivosolutions.com';
document.querySelectorAll('[data-talk-future]').forEach(link => {
  const subject = encodeURIComponent(link.dataset.subject || 'Talk About the Future - Medivo Inquiry');
  const body = encodeURIComponent(link.dataset.body || 'Hello Medivo team,\n\nI would like to talk about the future with Medivo.\n\nName:\nOrganization:\nPhone:\nMessage:');
  link.href = `mailto:${inquiryEmail}?subject=${subject}&body=${body}`;
});
const form = document.querySelector('[data-contact-form]');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Talk About the Future - ${data.get('inquiry') || 'Medivo Inquiry'}`);
    const body = encodeURIComponent(
      `Hello Medivo team,\n\nI would like to talk about the future with Medivo.\n\n` +
      `Name: ${data.get('name') || ''}\n` +
      `Email: ${data.get('email') || ''}\n` +
      `Phone: ${data.get('phone') || ''}\n` +
      `Organization: ${data.get('organization') || ''}\n` +
      `Inquiry Type: ${data.get('inquiry') || ''}\n\n` +
      `Message:\n${data.get('message') || ''}`
    );
    window.location.href = `mailto:${inquiryEmail}?subject=${subject}&body=${body}`;
    const status = form.querySelector('[data-form-status]');
    if (status) status.textContent = 'Your email client should open with the request addressed to daniel@medivosolutions.com.';
  });
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .reveal-scale').forEach(el => observer.observe(el));
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
