//import * as Feed from "./postManager.js";

/**
 * General method that should be called on all pages. Loads HTML data such as the header
 * as well as the nav and footer. Universal content
 */
async function initialize() {

    appendBanner()
    appendNav();
    addInnerFooter();
    return;
}

/**  Allows the dynamic updating of banner
 * 
 */
function appendBanner() {
    // Useful when I want to make banners dynamic
    //const pageTitle = document.title;
    const bannerElement = document.getElementsByClassName("banner")[0];
    // Update in future to name banner based on pageTitle
    // If banner not found imgPath reverts to default
    let imgName = "default";

    const toAppend = document.createElement("img");
    toAppend.src = `\\images\\core\\banner\\${imgName}.jpg`;
    bannerElement.appendChild(toAppend);
    return;
}

/**
 * Section of code that searches an HTML doc for the navContainer id. 
 * Appends nav html to class. Main purpose is to keep code that used across entire
 * site in one place.
 */
function appendNav(){
    const navElement = document.getElementsByClassName("navContainer")[0];
    const toAppend = document.createElement("ul");
    toAppend.classList.add("navList");
    toAppend.innerHTML = `
            <li>
                <a href="\\index.html">Home</a>
            </li>
            <li>
                <a href="">Projects</a>
            </li>
             <li>
                <a href="\\pages\\about.html">About</a>
            </li>`;

    navElement.appendChild(toAppend);
    return
}

/**
 * Finds the first footer tag in a page and adds innerHTML that should be
 * consistent site wide
 */
function addInnerFooter() {
    // getElementsByTagName does returns an object of type HTMLCollection
    // For historical reasons. This was implemented before arrays seemingly.
    const footerElement = document.getElementsByTagName("footer")[0];

    // innerHTML is not secure. Can be injected with scripts.
    footerElement.innerHTML = `
        <h2>Get in Touch</h2>
        <div class="feedStructure">
            <a href="https://github.com/fearyfiremast" target="_blank" ref=""noopener noreferrer"> 
                <img src="\\images\\core\\brand\\github-mark-white.png" alt="Github link">
            </a>
            <a href="https://www.linkedin.com/in/xander-smith-53879b294/" target="_blank" ref=""noopener noreferrer>
            <img src="\\images\\core\\brand\\InBug-White.png" alt="LinkedIn Link">
            </a>
            <a href="mailto:xandersmith@shaw.ca" target="_blank" ref=""noopener noreferrer>
            <img src="\\images\\core\\brand\\pngtree-email-icon-png-image_5065641.jpg" alt="email">
            </a>
        </div>`;
    return;
}

initialize();