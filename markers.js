// markers.js

// Define the antenna icon
var stationIcon = L.icon({
    iconUrl: 'images/StationIcon.png',
    iconSize: [32, 32],     // Size of the icon
    iconAnchor: [16, 32],   // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32]   // Point from which the popup should open relative to the iconAnchor
});

// Function to update station marker
function updateStationMarker(latlng, maidenhead) {
    if (!window.stationMarker) {
        window.stationMarker = L.marker(latlng, { icon: stationIcon, draggable: false }).addTo(window.map);
    } else {
        window.stationMarker.setLatLng(latlng);
    }
    window.stationMarker.bindPopup(`My Station<br>Maidenhead: ${maidenhead}`).openPopup();

    // Update info panel with station location Maidenhead
    document.getElementById('station-maidenhead').textContent = maidenhead;
}

// Function to update clicked marker
function updateClickedMarker(latlng, maidenhead) {
    if (!window.clickedMarker) {
        window.clickedMarker = L.marker(latlng, { draggable: false }).addTo(window.map);
    } else {
        window.clickedMarker.setLatLng(latlng);
    }
    window.clickedMarker.bindPopup(`Clicked location: ${maidenhead}`).openPopup();
}
