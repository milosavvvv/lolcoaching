// NEXUS is intentionally static/GitHub Pages friendly.
// Replace the three Stripe Payment Links in index.html with your real links.
// No Stripe secret key belongs in this file.

document.querySelectorAll('.plan-button').forEach((button) => {
  button.addEventListener('click', (event) => {
    const href = button.getAttribute('href') || '';
    if (href.includes('REPLACE_')) {
      event.preventDefault();
      alert('Stripe is not configured yet. Replace this button URL with the Stripe Payment Link for this plan.');
    }
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.setAttribute('tabindex', '-1');
  });
});
