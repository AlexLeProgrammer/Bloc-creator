// Import Firebase functions
import { getUserAscentsFromFirebase } from './firebase.js';

// Only initialize if we're on the my-ascents page
let bouldersList = null;
let noAscentsMessage = null;

// Check if we're on my-ascents page and initialize elements
if (window.location.pathname.includes('my-ascents') || document.querySelector('#no-ascents')) {
    bouldersList = document.querySelector('#boulders');
    noAscentsMessage = document.querySelector('#no-ascents');
}

let filteredGrade = null;
let userAscents = [];
let allBoulders = [];

// Get device UUID from localStorage or generate one
function getDeviceUUID() {
    let deviceUUID = localStorage.getItem('deviceUUID');
    if (!deviceUUID) {
        deviceUUID = 'device_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        localStorage.setItem('deviceUUID', deviceUUID);
    }
    return deviceUUID;
}

// Get user ascents from Firebase
function getUserAscents() {
    return userAscents;
}

// Load user ascents from Firebase
function loadUserAscents() {
    const uuid = getDeviceUUID();
    getUserAscentsFromFirebase(uuid, (ascents) => {
        userAscents = ascents || [];
        // Update UI if we're on the my-ascents page
        if (bouldersList && allBoulders.length > 0) {
            listAscents(getFilteredAscents());
        }
        // Update profile image if function exists
        if (typeof updateProfileImage !== 'undefined' && allBoulders.length > 0) {
            updateProfileImage(allBoulders);
        }
        // Dispatch event for other parts of the app
        document.dispatchEvent(new CustomEvent('ascents-loaded'));
    });
}

// Get completed boulders with their completion dates
function getCompletedBoulders() {
    userAscents = getUserAscents();

    if (userAscents.length === 0) {
        return [];
    }

    const completedBoulders = [];

    for (let ascent of userAscents) {
        const boulder = allBoulders.find(b => b.id === ascent.id);
        if (boulder) {
            completedBoulders.push({
                ...boulder,
                completedDate: ascent.date
            });
        }
    }

    // Sort by completion date (most recent first)
    return completedBoulders.sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate));
}

// Filter boulders by grade
function getFilteredAscents() {
    const completedBoulders = getCompletedBoulders();

    if (filteredGrade === null) {
        return completedBoulders;
    }
    return completedBoulders.filter(item => item.grade === filteredGrade);
}

// List ascents in the UI
function listAscents(ascents) {
    // Only run if we're on the my-ascents page
    if (!bouldersList || !noAscentsMessage) {
        return;
    }

    bouldersList.innerHTML = '';

    if (ascents.length === 0) {
        noAscentsMessage.style.display = 'block';
        return;
    }

    noAscentsMessage.style.display = 'none';

    for (let boulder of ascents) {
        bouldersList.innerHTML += `<a href="boulder.html?id=${boulder.id}">
            <img src="images/grades/${boulder.grade}.png">
            <img class="project-marker" src="images/projectMarker.png" ${boulder.project ? '' : 'style="display: none"'}>
            <div>
                <p class="title">${boulder.name}</p>
                <p class="routesetter">${boulder.setter}</p>
            </div>
            <p class="date" style="color: #4CAF50; font-weight: bold;">Réalisé: ${formatDate(boulder.completedDate)}</p>
        </a>`;
    }
}

// Search functionality - only on my-ascents page
if (document.querySelector('#searchbar') && (window.location.pathname.includes('my-ascents') || document.querySelector('#no-ascents'))) {
    document.querySelector('#searchbar').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const completedBoulders = getFilteredAscents();

        const result = completedBoulders.filter(item =>
            item.name.toLowerCase().includes(searchTerm) ||
            item.setter.toLowerCase().includes(searchTerm)
        );
        listAscents(result);
    });
}

// Grade filtering
function filterGrades(grade) {
    gradesInput(grade);

    // Apply filter and search
    const searchTerm = document.querySelector('#searchbar').value.toLowerCase();
    const filteredAscents = getFilteredAscents();

    const result = filteredAscents.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.setter.toLowerCase().includes(searchTerm)
    );
    listAscents(result);
}

// Listen for when boulders are loaded from Firebase
document.addEventListener('boulders-loaded', (e) => {
    allBoulders = e.detail;

    // Load user ascents from Firebase
    loadUserAscents();
});

// Export functions for use in other scripts
export { getDeviceUUID };

window.getUserAscents = getUserAscents;
