// -------- Mobile Menu --------
const menuBtn = document.querySelector('.menu-toggle');
const navList = document.getElementById('nav-list');
menuBtn.addEventListener('click', () => {
  const open = navList.classList.toggle('show');
  menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
});
document.querySelectorAll('#nav-list a').forEach(a => {
  a.addEventListener('click', () => navList.classList.remove('show'));
});

// -------- Flashcards (Highlights) --------
const flashEl = document.getElementById('flashcards');
const flashTexts = [
  "Event Lighting • Golden Glow • Cinematic Wash",
  "DJ & Sound • Clear Vocals • Tight Low-End",
  "Decor & Effects • Fairy-Lit • CO₂ Jets • Cold Pyros",
  "Weddings & Receptions • Grand Entries • Sangeet"
];
let fIdx = 0;

function cycleFlash(){
  flashEl.style.opacity = 0;
  flashEl.style.transform = 'translateY(12px)';
  setTimeout(() => {
    fIdx = (fIdx + 1) % flashTexts.length;
    flashEl.textContent = flashTexts[fIdx];
    flashEl.style.opacity = 1;
    flashEl.style.transform = 'translateY(0)';
  }, 450);
}
// init
flashEl.textContent = flashTexts[0];
setInterval(cycleFlash, 2600);

// -------- Reveal on Scroll (Services + Gallery + Contact) --------
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal, .gallery-item').forEach(el => io.observe(el));

// -------- Lightbox for Gallery --------
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('.lb-img');
const lbClose = lb.querySelector('.lb-close');
const lbPrev = lb.querySelector('.lb-prev');
const lbNext = lb.querySelector('.lb-next');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
let currentIndex = 0;

function openLightbox(index){
  currentIndex = index;
  lbImg.src = galleryItems[index].dataset.full || galleryItems[index].src;
  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false');
}
function closeLightbox(){
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');
  lbImg.src = '';
}
function showPrev(){
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  lbImg.src = galleryItems[currentIndex].dataset.full || galleryItems[currentIndex].src;
}
function showNext(){
  currentIndex = (currentIndex + 1) % galleryItems.length;
  lbImg.src = galleryItems[currentIndex].dataset.full || galleryItems[currentIndex].src;
}

galleryItems.forEach((img, i) => {
  img.addEventListener('click', () => openLightbox(i));
});
lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', showPrev);
lbNext.addEventListener('click', showNext);
lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
});

// -------- Testimonials Carousel --------
const track = document.querySelector('.car-track');
const slides = Array.from(document.querySelectorAll('.car-slide'));
const prevBtn = document.querySelector('.car-prev');
const nextBtn = document.querySelector('.car-next');
let slideIndex = 0, autoTimer = null;

function goToSlide(i){
  slideIndex = (i + slides.length) % slides.length;
  // FIXED → backticks for template literal
  track.style.transform = `translateX(-${slideIndex * 100}%)`;
}
function nextSlide(){ goToSlide(slideIndex + 1); }
function prevSlide(){ goToSlide(slideIndex - 1); }
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

function startAuto(){ autoTimer = setInterval(nextSlide, 3500); }
function stopAuto(){ clearInterval(autoTimer); }
track.addEventListener('mouseenter', stopAuto);
track.addEventListener('mouseleave', startAuto);
startAuto();
