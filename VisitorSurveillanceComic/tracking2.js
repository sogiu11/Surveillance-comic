// tracking.js
const trackingSummary = document.getElementById('tracking-summary');
const trackingData = JSON.parse(localStorage.getItem('trackingData'));

if (trackingData) {
    trackingSummary.innerHTML = `
        <h2>Time Spent on Each Page</h2>
        <ul>${trackingData.pageTime.map((time, i) => `<li>Page ${i + 1}: ${time.toFixed(2)}s</li>`).join('')}</ul>
        
        <h2>Poll Responses</h2>
        <ul>${trackingData.pollResponses.map((response, i) => `<li>Page ${i + 1}: ${response || 'No response'}</li>`).join('')}</ul>
        
        <h2>Reactions</h2>
        <ul>${trackingData.reactions.map((reaction) => `<li>${reaction}</li>`).join('')}</ul>
        
        <h2>Comments</h2>
        <ul>${trackingData.comments.map((comment) => `<li>${comment}</li>`).join('')}</ul>
    `;
} else {
    trackingSummary.textContent = 'No tracking data available.';
}
