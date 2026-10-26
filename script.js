document.getElementById('year').textContent = new Date().getFullYear();

const menuBtn = document.getElementById('menuBtn');
const links = document.getElementById('links');
menuBtn.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
links.addEventListener('click', e => { if (e.target.tagName === 'A') links.classList.remove('open'); });

// Typing terminal
const lines = [
  '$ az vm create --name cui-web --image Ubuntu2204',
  '✔ VM provisioned',
  '$ sudo apt install nginx -y',
  '✔ nginx installed',
  '$ git push origin main',
  '✔ Pipeline passed — deployed 🚀'
];
const term = document.getElementById('term');
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  term.textContent = lines.join('\n');
} else {
  let l = 0, c = 0, text = '';
  (function type() {
    if (l >= lines.length) { term.innerHTML = text + '<span class="cursor"></span>'; return; }
    text += lines[l][c++];
    term.innerHTML = text + '<span class="cursor"></span>';
    if (c >= lines[l].length) { text += '\n'; l++; c = 0; setTimeout(type, 450); }
    else setTimeout(type, 28);
  })();
}

// Scroll reveal
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Form validation (client-side demo; no backend on a static site)
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const status = document.getElementById('status');
  const n = document.getElementById('name').value.trim();
  const m = document.getElementById('email').value.trim();
  const msg = document.getElementById('message').value.trim();
  if (!n || !msg || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m)) {
    status.classList.add('error');
    status.textContent = 'Please enter your name, a valid email and a message.';
    return;
  }
  status.classList.remove('error');
  status.textContent = `Thanks ${n}! Your message has been received.`;
  e.target.reset();
});
