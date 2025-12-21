
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
            <a href="mailto:xws@sfu.ca" target="_blank" ref="noopener noreferrer">
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
    window.scrollTo({
        top: yPos,
        behavior: "auto"       
    });
}

/**
 * Checks if layout is stabilized based on the value of the scroll height. When the promise is fulfilled
 * the layout has stabilized.
 * 
 * @returns {Promise}
 */
function stableLayout() {
    return new Promise(resolve => {
        const interval = 100;
        const matchThreshold = 2;
        let matches = 0;

        // scrollheight is used because it considers overflow. Provides better overall picture
        let prevPageHeight = document.documentElement.scrollHeight;

        function checkStability() {
            const currentPageHeight = document.documentElement.scrollHeight;
            if (currentPageHeight === prevPageHeight) {
                matches += 1;
            }
            else {
                matches = 0;
                prevPageHeight = currentPageHeight;
            }

            // Determines if layout is stable
            if (matches >= matchThreshold) {
                resolve();
            }
            else {
                // Timeout -> callback recursion
                setTimeout(checkStability, interval);
            }
        }

        checkStability();
    });
}

/**
 * Returns a promise that may contain the target element designated by
 * destName.
 * 
 * @param {string} destName 
 * @returns {Promise} Destination Element
 */
function waitForElement(destName) {
    return new Promise(resolve => {

        // checks if destName already exists in DOM
        const destElem = document.querySelector(destName);
        if (destElem){
            resolve(destElem);
        }

        // Mutation Observer. Waits until child with dest name exists
        // Defines callback
        const dynamicObserver = new MutationObserver(() => {
            const destElem = document.querySelector(destName);
            if (destElem){
                dynamicObserver.disconnect()
                resolve(destElem)
            }
        });

        // Sets up observer.
        dynamicObserver.observe(document.body, {
            subtree: true, childList: true
        });
    });
}

// Majour issue: Currently no guarantee that elements will be loaded when scroll is attempted
window.addEventListener("DOMContentLoaded", async ()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const dest = urlParams.get("dest");
    if (dest) {
        await waitForElement(dest); // Element exists
        await stableLayout(); // Layout finalized
        await new Promise(requestAnimationFrame); // Layout painted
        _scrollToWithDynamicHeader(dest); // scrolls
    }
});

initialize();