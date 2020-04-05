/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/


/**
 * End Global Variables
 * Start Helper Functions
 *
*/

function createNavElement(staticElement) {
  let navbarLink = document.createElement('a');
  navbarLink.textContent = staticElement.dataset.nav;
  navbarLink.dataset['sectionId'] = staticElement.id;
  if(staticElement.id === 'section1') {
    navbarLink.classList.toggle('active');
  }
  navbarLink.href = `#${staticElement.id}`;
  return navbarLink;
}

function createNavbar() {
  let navbar = document.querySelector('#navbar__list');
  let sections = document.querySelectorAll('section[data-nav]');
  // Using a for loop without any DocumentFragment makes more sense here since
  // there are a low number of sections (< 10) and no degraded performance would be
  // perceived.
  for(let section of sections) {
    let navbarElement = document.createElement('li');
    navbarElement.appendChild(createNavElement(section));
    navbar.appendChild(navbarElement);
  }
  return navbar;
}

function navbarClickHandler(event) {
  // Not clicking a navbar link should just do nothing.
  if(event.target.tagName === 'UL') {
    return;
  }

  let navbar = document.querySelector('#navbar__list');
  let currentActiveLink = navbar.querySelector('.active');
  let clickedLink = event.target;
  if(currentActiveLink == clickedLink) {
    return;
  }

  let currentActiveSection = document.querySelector('section.active');
  let newActiveSection = document.querySelector(`#${clickedLink.dataset.sectionId}`);
  if(currentActiveSection == newActiveSection) {
    return;
  }

  currentActiveSection.classList.toggle('active');
  newActiveSection.classList.toggle('active');
}

function observerCallback(entries, observer) {
  for(let entry of entries) {
    if(entry.isIntersecting && entry.intersectionRatio > .3) {
      let activeSection = document.querySelector('section.active');
      if(activeSection) {
        activeSection.classList.toggle('active');
      }

      document.querySelector('a.active').classList.toggle('active');

      entry.target.classList.toggle('active');
      document.querySelector(`a[data-section-id="${entry.target.id}"]`).classList.toggle('active');
    }
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

document.addEventListener('DOMContentLoaded', () => {
  let navbar = createNavbar();
  navbar.addEventListener('click', navbarClickHandler);

  let observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: [.3, .6]
  };

  let observer = new IntersectionObserver(
    observerCallback, observerOptions
  );

  document.querySelectorAll('section').forEach(section => observer.observe(section));
});

/**
 * End Main Functions
*/
