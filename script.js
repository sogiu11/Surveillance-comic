// script.js

const comicPages = [
    './images/page1.jpg',
    './images/page2.jpg',
    './images/page3.jpg'
];

const trackingData = {
    pageTime: [],
    pollResponses: [],
    reactions: [],
    comments: [],
    mouseMovements: [],
    totalTime: 0,
    screenZones: {
        north: 0,
        south: 0,
        east: 0,
        west: 0
    }
};

let currentPage = 0;
let pageStartTime = Date.now();
let siteStartTime = Date.now();

// Load comic pages
const comicViewer = document.getElementById('comic-viewer');
comicPages.forEach((page, index) => {
    const img = document.createElement('img');
    img.src = page;
    img.alt = `Page ${index + 1}`;
    img.dataset.index = index;
    comicViewer.appendChild(img);
    trackingData.pageTime[index] = 0;
});

// Track time per page
comicViewer.addEventListener('scroll', () => {
    const viewer = comicViewer;
    const visibleIndex = Math.floor(viewer.scrollLeft / viewer.clientWidth);

    if (visibleIndex !== currentPage) {
        const now = Date.now();
        trackingData.pageTime[currentPage] += (now - pageStartTime) / 1000;
        currentPage = visibleIndex;
        pageStartTime = now;
    }

    if (comicViewer.scrollLeft + comicViewer.clientWidth >= comicViewer.scrollWidth) {
        document.getElementById('consent-button').style.display = 'block';
    }
});

// Track mouse movement
document.body.addEventListener('mousemove', (event) => {
    const { clientX, clientY, innerWidth, innerHeight } = event;

    trackingData.mouseMovements.push({ x: clientX, y: clientY, time: Date.now() });

    if (clientY < innerHeight / 2) {
        if (clientX < innerWidth / 2) trackingData.screenZones.north++;
        else trackingData.screenZones.east++;
    } else {
        if (clientX < innerWidth / 2) trackingData.screenZones.west++;
        else trackingData.screenZones.south++;
    }
});

// Calculate total time on site
window.addEventListener('beforeunload', () => {
    trackingData.totalTime = (Date.now() - siteStartTime) / 1000;
    localStorage.setItem('trackingData', JSON.stringify(trackingData));
});

// Polls, reactions, and comments remain unchanged
// Polls
const pollSection = document.getElementById('poll-section');
comicPages.forEach((_, index) => {
    const poll = document.createElement('div');
    poll.innerHTML = `
        <p>What do you think of page ${index + 1}?</p>
        <label><input type="radio" name="poll-${index}" value="Agree"> Agree</label>
        <label><input type="radio" name="poll-${index}" value="Neutral"> Neutral</label>
        <label><input type="radio" name="poll-${index}" value="Disagree"> Disagree</label>
    `;
    pollSection.appendChild(poll);
});


pollSection.addEventListener('change', (event) => {
    const [_, index] = event.target.name.split('-');
    trackingData.pollResponses[index] = event.target.value;


    // Pop-up per conferma
    alert(`You successfully voted for poll ${parseInt(index) + 1}!`);
});


// Reactions
document.querySelectorAll('.reaction-btn').forEach((btn) => {
    btn.addEventListener('click', (event) => {
        trackingData.reactions.push(event.target.dataset.reaction);


        // Pop-up per conferma
        alert('You successfully reacted!');
    });
});


// Comments
const commentInput = document.getElementById('comment-input');
const commentList = document.getElementById('comment-list');
document.getElementById('submit-comment').addEventListener('click', () => {
    const comment = commentInput.value.trim();
    if (comment) {
        trackingData.comments.push(comment);
        const li = document.createElement('li');
        li.textContent = comment;
        commentList.appendChild(li);
        commentInput.value = '';
    }
});

// Consent button
document.getElementById('consent-button').addEventListener('click', () => {
    localStorage.setItem('trackingData', JSON.stringify(trackingData));
    window.location.href = './tracking.html'; // Modifica qui il percorso del secondo sito, se necessario.
});
