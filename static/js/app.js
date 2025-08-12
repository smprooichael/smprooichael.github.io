import { courses } from '../models/courses.js';

// بارگذاری HTML از فایل‌ها
async function loadView(viewName) {
  const res = await fetch(`views/${viewName}.html`);
  return await res.text();
}

// قرار دادن header و footer ثابت
async function loadLayout() {
  const headerHTML = await loadView('header');
  const footerHTML = await loadView('footer');
  document.body.insertAdjacentHTML('afterbegin', headerHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// بارگذاری محتوای اصلی در #app
async function loadPage(page) {
  const app = document.getElementById('app');
  const html = await loadView(page);
  app.innerHTML = html;

  if (page === 'courses') {
    renderCourses();
    setupSlider();
  }
}

// رندر کردن کارت‌های دوره‌ها در اسلایدر
function renderCourses() {
  const slider = document.getElementById('coursesSlider');
  slider.innerHTML = '';
  courses.forEach(course => {
    const card = document.createElement('div');
    card.classList.add('course-card');
    card.innerHTML = `
      <img src="${course.img}" alt="${course.title}">
      <h3>${course.title}</h3>
      <p>${course.desc}</p>
    `;
    slider.appendChild(card);
  });
}

// کنترل اسکرول اسلایدر
function setupSlider() {
  const slider = document.getElementById('coursesSlider');
  document.getElementById('slideLeft').onclick = () => {
    slider.scrollBy({ left: -300, behavior: 'smooth' });
  };
  document.getElementById('slideRight').onclick = () => {
    slider.scrollBy({ left: 300, behavior: 'smooth' });
  };
}

// مدیریت کلیک روی لینک‌های ناوبری
function setupNavigation() {
  document.body.addEventListener('click', async e => {
    if (e.target.matches('a[data-link]')) {
      e.preventDefault();
      const page = e.target.getAttribute('data-link');
      await loadPage(page);
      window.scrollTo(0, 0);
    }
  });
}

async function init() {
  await loadLayout();
  const appDiv = document.createElement('div');
  appDiv.id = 'app';
  document.body.insertBefore(appDiv, document.querySelector('footer'));
  await loadPage('home');
  setupNavigation();
}

init();
