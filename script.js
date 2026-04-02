// ── Scroll animations ────────────────────────────────
const ioCards = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      const d = Number(e.target.dataset.delay || 0);
      setTimeout(() => e.target.classList.add('visible'), d);
      ioCards.unobserve(e.target);
    }
  });
},{threshold:.08});
document.querySelectorAll('.card').forEach(c => ioCards.observe(c));

const ioAm = new IntersectionObserver(entries => {
  entries.forEach((e,i) => {
    if(e.isIntersecting){
      setTimeout(() => e.target.classList.add('visible'), i * 65);
      ioAm.unobserve(e.target);
    }
  });
},{threshold:.05});
document.querySelectorAll('.amenity').forEach(a => ioAm.observe(a));

// ── Custom Price Calculator ──────────────────────────
let persons = 1;

const tiers = [
  {max:1, rate:250, label:'Non-AC Bed', emoji:'🛌'},
  {max:2, rate:250, label:'Non-AC Beds', emoji:'🛌'},
  {max:4, rate:300, label:'Waiting Room', emoji:'🪑'},
  {max:6, rate:300, label:'Waiting Rooms', emoji:'🪑'},
  {max:99,rate:400, label:'Sleeper Beds', emoji:'🛏️'},
];

function getTier(n){ return tiers.find(t => n <= t.max); }

function updateCard(){
  const t = getTier(persons);
  const total = persons * t.rate;
  document.getElementById('personCount').textContent = persons;
  document.getElementById('customPrice').textContent = '₹' + total.toLocaleString('en-IN');
  document.getElementById('roomSuggest').textContent =
    t.emoji + ' ' + persons + ' ' + t.label + ' — ₹' + t.rate + '/- प्रति व्यक्ति';
  document.getElementById('groupCallBtn').href = 'tel:9770236735';
}

function changePerson(delta){
  persons = Math.max(1, Math.min(20, persons + delta));
  updateCard();
}
updateCard();

// ── Ensure ALL phone numbers are direct call links ───
// Any element displaying a number gets a call wrapper
document.querySelectorAll('*').forEach(el => {
  if(el.childElementCount === 0){
    const txt = el.textContent.trim();
    // match 10-digit numbers
    if(/^[6-9]\d{9}$/.test(txt.replace(/\s/g,''))){
      const num = txt.replace(/\s/g,'');
      if(el.tagName !== 'A'){
        el.style.cursor = 'pointer';
        el.style.color = 'var(--saffron)';
        el.style.fontWeight = '800';
        el.addEventListener('click', () => window.location.href = 'tel:' + num);
      }
    }
  }
});