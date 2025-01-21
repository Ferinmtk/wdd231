// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Wayfinding: Update active link on click
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(link => link.classList.remove('active'));
    link.classList.add('active');
  });
});

// Filtering courses
const filterButtons = document.querySelectorAll('.filter-btn');
const courseButtons = document.querySelectorAll('.course-btn');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    courseButtons.forEach(course => {
      if (filter === 'all' || course.getAttribute('data-category') === filter) {
        course.classList.remove('hidden');
      } else {
        course.classList.add('hidden');
      }
    });
  });
});


document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', (event) => {
      alert(`Navigating to ${event.target.innerText}`);
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
const lastModifiedDate = document.lastModified; 
document.getElementById('lastModified').textContent = lastModifiedDate; 