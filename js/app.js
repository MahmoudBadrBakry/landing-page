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


let navBarul = null
let navBarHiddingTimer

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */


/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav

function initialize() {

    topButtonDisplay();

    // select all sections and the navbar
    const sections = document.querySelectorAll('section')
    const navBar = document.querySelector('.navbar__menu')

    navBarul = document.createElement('ul')
    navBar.setAttribute('id', 'navbar__list')

    for (const section of sections) {
        // li and a elements creation
        let sectionReference = document.createElement('li')
        let sectionLink = document.createElement('a')

        // setting ids
        sectionReference.setAttribute('id', `${section.getAttribute('id')}-li`)
        sectionLink.setAttribute('id', `${section.getAttribute('id')}-a`)

        // filling by target text 
        sectionLink.textContent = section.getAttribute('data-nav')

        // inserting a into li 
        sectionReference.insertAdjacentElement("afterbegin", sectionLink)

        // styling
        sectionReference.classList.add('menu__link')

        // Scroll to section using scrollIntoView 
        sectionReference.addEventListener('click', (e) => {
            section.scrollIntoView({
                behavior: "smooth"
            })
        })

        //append element to the unordered list
        navBarul.appendChild(sectionReference)
    }
    // insert ul to the navbar
    navBar.insertAdjacentElement("afterbegin", navBarul)
}

// Add class 'active' to section when near top of viewport 

function updateActiveSection() {
    const sections = document.querySelectorAll('section')

    for (const section of sections) {
        let { top, bottom } = section.getBoundingClientRect()
            // get li element by each section
        let query = '#' + section.getAttribute('id') + '-li'
        let sectionLink = document.querySelector(query)

        try {
            // update section state to active or inactive
            if (top <= 200 && bottom > 300) {
                section.classList.add("your-active-class")
                sectionLink.classList.add('menu__link-active')
            } else {
                section.classList.remove("your-active-class")
                sectionLink.classList.remove('menu__link-active')
            }
        } catch (error) {

        }

    }
}



// Scroll to top
function scrollToTopFunction() {
    document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

// Hide or Display Top Button
function topButtonDisplay() {
    let topBtn = document.getElementById('topBtn')
    if (document.documentElement.scrollTop > 400) {
        topBtn.classList.remove('hide')
    } else {
        topBtn.classList.add('hide')
    }
}

// Hide navBar
function navBarDisplay() {
    try {
        let navBar = document.querySelector('.navbar__menu')
        navBar.classList.remove("hide");

        if (navBarHiddingTimer != "undefined") {
            clearTimeout(navBarHiddingTimer)
        }

        navBarHiddingTimer = setTimeout(() => {
            navBar.classList.add("hide");
        }, 3000)

    } catch (e) {

    }
}


/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 

window.onload = initialize

// Scroll to section on link click



// Set sections as active
document.addEventListener('scroll', updateActiveSection)

// Display or Hide top Button
document.addEventListener('scroll', topButtonDisplay)

// Display or hide navbar
document.addEventListener('scroll', navBarDisplay)