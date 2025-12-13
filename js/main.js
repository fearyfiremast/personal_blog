
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
    const navList = document.createElement("ul");
    navList.classList.add("navList");
    
    /**
     * Map between nav button names and their destinations
     * Key: Name of nav item
     * Value: Destination. Format <pagepath>, <ClassorId>.
     * Must have atleast 1 argument <pagepath>
     */
    const nameToDest = Object.freeze({
        Home: "/index.html",
        Projects:"/index.html, .postContainer",
        About:"/index.html, .pageInfoContainer"
    });
    
    // Objects instances do not have an inherited key methods
    for (const navKey of Object.keys(nameToDest)) {
        const toAdd = document.createElement("li");
        toAdd.classList.add("navBtn")
        toAdd.textContent = navKey;
        toAdd.classList.add

        // Event definition
        toAdd.addEventListener("click", (e)=>{
            let navDestination = nameToDest[e.target.textContent];
            navDestination = navDestination.split(", ");
            console.log(navDestination);

            if (window.location.pathname !== navDestination[0]) {
                // If page does not exist goes to a 404 page
                let path = navDestination[0];
                if (navDestination.length === 2){
                    path += `?dest=${navDestination[1]}`;
                }
                window.location.href = path;
                return
            }
            // no additional arguments and destinations match
            if (navDestination.length < 2) {
                window.location.href = navDestination[0]
                return
            }
            _scrollToWithDynamicHeader(navDestination[1]);
        })

        // Adds new element to navBar
        navList.appendChild(toAdd)  
    }

    navElement.appendChild(navList)
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
        <div class="feedStructure footerStructure ">
            <a href="https://github.com/fearyfiremast" target="_blank" ref="noopener noreferrer" title="https://github.com/fearyfiremast"> 
                <img src="\\images\\core\\brand\\github-mark-white.png" alt="Github link">
            </a>
            <a href="https://www.linkedin.com/in/xander-smith-53879b294/" target="_blank" ref="noopener noreferrer" title="https://www.linkedin.com/in/xander-smith-53879b294/">
                <img src="\\images\\core\\brand\\InBug-White.png" alt="LinkedIn Link" title="\\images\\core\\brand\\InBug-White.png">
            </a>
            <a href="mailto:xandersmith@shaw.ca" target="_blank" ref="noopener noreferrer">
                <img src="\\images\\core\\brand\\Email_Icon.png" alt="email" title="mailto:xandersmith@shaw.ca">
            </a>
        </div>`
    return;
}

/**
 * given a destination string (can be css classifier or HTML element) scrolls to the first
 * matching element that matches with destinationCSSName. position on the page accounting 
 * for dynamically sized nav bar. If no matches are found does nothing
 * 
 * @param {string} destinationCSSName 
 * @returns 
 */
function _scrollToWithDynamicHeader(destinationCSSName) {
    // Calculating new y position
    console.log(`val: ${destinationCSSName}`)
    const navBarHeight = document.querySelector(".navList").clientHeight;
    const navCSSItem = document.querySelector(destinationCSSName);
    const YPosCSSNavDest = navCSSItem.getBoundingClientRect().top;

    // Error message
    if (navCSSItem === null) {
        console.error(```No Results found from document query: ${navCSSItem}.```);
        return;
    }

    // New position of widow
    const yPos = YPosCSSNavDest + window.pageYOffset - navBarHeight;
    console.log(`dest y: ${yPos}`)
    window.scrollTo({
        top: yPos,
        behavior: "auto"       
    });
}

// Majour issue: Currently no guarantee that elements will be loaded when scroll is attempted
window.addEventListener("DOMContentLoaded", ()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const dest = urlParams.get("dest");
    if (dest) {
        _scrollToWithDynamicHeader(dest)
    }
});

initialize();