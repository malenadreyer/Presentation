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

  events() {
    window.addEventListener('load', () => { this.didRender(); });
    window.addEventListener('scroll', () => { this.onScroll(); });
    window.addEventListener('resize', () => { this.onResize(); });
  }
}

new StickyNav();