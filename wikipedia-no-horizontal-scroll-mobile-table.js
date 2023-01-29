// ==UserScript==
// @name        wikipedia-no-horizontal-scroll-mobile-table
// @description Make it so tables are easier to read on mobile Wikipedia pages.
// @match       https://en.m.wikipedia.org/*
// ==/UserScript==

const updatePage = () => {
    // Hide first row of each episode table.
    const headers = document.querySelectorAll('.wikiepisodetable tr:first-child');
    headers.forEach(header => header.style.display = "none");
    
    document.querySelectorAll('tr.vevent').forEach(row => {
        // Make each row of episode information vertical.
        row.style.display = "flex";
        row.style["flex-direction"] = "column";
        
        // Prepend the corresponding header.
        // This assumes all episode tables have the same header row.
        Array.from(row.children).forEach((data, index) => {
            data.prepend(headers[0].children[index].cloneNode(true));
        });
    });
};

if (document.readyState !== 'loading') { // iOS Safari bug
    updatePage();
} else {
    window.addEventListener('DOMContentLoaded', updatePage);
}
