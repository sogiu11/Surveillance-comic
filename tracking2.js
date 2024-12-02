// tracking2.js

const trackingSummary = document.getElementById('tracking-summary');
const trackingData = JSON.parse(localStorage.getItem('trackingData'));

if (trackingData) {
    trackingSummary.innerHTML = `
        <h2>Time Spent on Each Page</h2>
        <ul>${trackingData.pageTime.map((time, i) => `<li>Page ${i + 1}: ${time.toFixed(2)}s</li>`).join('')}</ul>

        <h2>Total Time on Site</h2>
        <p>${trackingData.totalTime.toFixed(2)} seconds</p>

        <h2>Poll Responses</h2>
        <ul>${trackingData.pollResponses.map((response, i) => `<li>Page ${i + 1}: ${response || 'No response'}</li>`).join('')}</ul>

        <h2>Reactions</h2>
        <ul>${trackingData.reactions.map((reaction) => `<li>${reaction}</li>`).join('')}</ul>

        <h2>Comments</h2>
        <ul>${trackingData.comments.map((comment) => `<li>${comment}</li>`).join('')}</ul>

        <h2>Mouse Movements</h2>
        <ul>${trackingData.mouseMovements.slice(-10).map(({ x, y, time }) => `<li>X: ${x}, Y: ${y}, Time: ${new Date(time).toLocaleTimeString()}</li>`).join('')}</ul>

        <h2>Screen Zones Activity</h2>
        <ul>
            <li>North: ${trackingData.screenZones.north}</li>
            <li>South: ${trackingData.screenZones.south}</li>
            <li>East: ${trackingData.screenZones.east}</li>
            <li>West: ${trackingData.screenZones.west}</li>
        </ul>
    `;
} else {
    trackingSummary.textContent = 'No tracking data available.';
}
