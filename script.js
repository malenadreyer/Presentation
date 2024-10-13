const darkModeToggle = document.getElementById('darkmode-toggle');
  const typingDemo = document.querySelector('.typing-demo');
  let darkModeEnabled = false;

  darkModeToggle.addEventListener('click', function () {
    darkModeEnabled = !darkModeEnabled;


    document.body.classList.toggle('dark-mode');


    if (darkModeEnabled) {
      typingDemo.classList.add('paused'); 
    } else {
      typingDemo.classList.remove('paused'); 
    }
  });
// StickyNav functionality
const NAV_OFFSET = 30;

class StickyNav {
  constructor() {
    this.el = null;
    this.anchor = null;
    this.removedScrollClass = '';
    this.sections = [];
    this.menuLinks = [];

    this.events();
  }

  didRender() {
    this.el = document.getElementsByTagName('nav')[0];
    this.anchor = document.getElementsByClassName('nav-anchor')[0];
    this.removedScrollClass = this.el.className;
    this.menuLinks = document.querySelectorAll('nav ul li'); // Get all menu links


    this.sections = Array.from(this.menuLinks)
      .filter(link => link.textContent.toLowerCase().trim() !== 'darkmode') // Exclude 'Darkmode'
      .map(link => {
        const sectionId = link.textContent.toLowerCase().trim();
        return document.getElementById(sectionId); // Assumes section IDs match menu link text
      });

    this.onResize();
    this.addSmoothScroll(); // Adding smooth scroll here
  }

  onResize() {
    const { paddingLeft, paddingRight } = window.getComputedStyle(this.el.parentNode),
      parentWidth = this.el.parentNode.offsetWidth - parseInt(paddingLeft) - parseInt(paddingRight);

    this.el.style.width = `${parentWidth}px`;
  }

  onScroll() {
    const scroll = Math.max(document.documentElement.scrollTop, document.body.scrollTop),
      topOffset = this.anchor.offsetTop - NAV_OFFSET;

    if (this.el.className.indexOf('scroll') != -1) {
      if (scroll <= topOffset) {
        this.el.className = this.removedScrollClass;
      }
    } else if (scroll >= topOffset) {
      this.el.className += ' scroll';
    }

  }

  // Smooth scroll function
  addSmoothScroll() {
    this.menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const sectionId = link.textContent.toLowerCase().trim();
        const section = document.getElementById(sectionId);

        if (section) {
          e.preventDefault();
          window.scrollTo({
            top: section.offsetTop - NAV_OFFSET, // Adjusting for header height
            behavior: 'smooth'
          });
        }
      });
    });
  }

  events() {
    window.addEventListener('load', () => { this.didRender(); });
    window.addEventListener('scroll', () => { this.onScroll(); });
    window.addEventListener('resize', () => { this.onResize(); });
  }
}

function slowScrollTo(element, duration) {
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
}

  requestAnimationFrame(animation);
}

// Brug denne funktion ved klik
function scrollToSection(event, sectionId) {
  event.preventDefault();
  const section = document.getElementById(sectionId);
  if (section) {
      slowScrollTo(section, 2000); // Varighed i millisekunder, her er det 2000ms (2 sekunder)
  }
}

// Tilføj event listeners til hver menu link
document.getElementById('who-link').addEventListener('click', (event) => {
  scrollToSection(event, 'who');
});

document.getElementById('skills-link').addEventListener('click', (event) => {
  scrollToSection(event, 'skills');
});

document.getElementById('resume-link').addEventListener('click', (event) => {
  scrollToSection(event, 'resume');
});

document.getElementById('links-link').addEventListener('click', (event) => {
  scrollToSection(event, 'links');
});

new StickyNav();
