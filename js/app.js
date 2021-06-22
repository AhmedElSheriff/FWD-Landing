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

const navMenu = document.querySelector('ul');
const navItems = document.getElementsByClassName("nav-item");
const backToTopBtn =  document.getElementById('back-to-top-btn');
const navBar = document.querySelector('header');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


/* This function returns all visible sections and save it to an object with key & value
The key is the section ID and the value is the section text */
function getAllSections() {

    let allSections = document.querySelectorAll('section');
    let sectionObj = {};

    allSections.forEach(section => {


        sectionObj[section.id] = section.dataset.nav;

    });

    return sectionObj;
}

function scrollToTop() {

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

}

// Get Object Size

Object.size = function(obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


//Build the nav

function buildNav() {

    let sectionObj = getAllSections();

    for (let key in sectionObj){

        const listElement = document.createElement('li');
        const anchorElement = document.createElement('a');

        listElement.classList.add('nav-item');
        anchorElement.classList.add('nav-link');
        anchorElement.textContent = sectionObj[key];
        //anchorElement.href = "#" + key;
        anchorElement.dataset.secid = key;
        listElement.appendChild(anchorElement);
        navMenu.appendChild(listElement);

    }

}


/**
 * End Main Functions
 * Begin Events
 * 
*/


// Build Navigation Menu when DOM is loaded

document.addEventListener("DOMContentLoaded", function(event) { 

    buildNav();

});
  
// Scroll event 

window.addEventListener('scroll', (event) => {


    let sections = document.querySelectorAll('section');
    let scrollTop = window.scrollY;

    
    // Loop in each section to set the active state of the nav menu items
    sections.forEach(section => {

        let sectionId = section.id;
        let navItem = document.querySelector("[data-secId='" + section.id + "']");
        
        if(scrollTop > section.offsetTop - 250 && scrollTop < section.offsetTop + section.offsetHeight - 250) {
            navItem.classList.add('active');
        }else{
            navItem.classList.remove('active');
        }
        
    });

    // Show or Hide back to top button

    if(scrollTop > 300) {

        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }



});

// Back to the top of the page when the button is clicked

backToTopBtn.addEventListener('click', scrollToTop);

// Use scrollIntoView() to navigate to sections

document.addEventListener("DOMContentLoaded", (event) => { 

    for(let item of navItems) {

        item.addEventListener('click', function(event) {

            let sectionId = event.target.dataset.secid;
            
            const section = document.getElementById(sectionId);

            if(section) {

                section.scrollIntoView();
            }
        });
    }

});
