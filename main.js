// Global variables for the map and layers
var map;
var destinationMarker;
var geodeticArcLayer;
var beamwidthLayer;
var stationLatLng; // Global variable to store station coordinates

// Initialize the application
initializeApp();

// Function to initialize the application
function initializeApp() {
    // Initialize the Leaflet map
    map = L.map('map').setView([0, 0], 2); // Initial view at coordinates [0, 0] and zoom level 2

    // Add OpenStreetMap tiles to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Set default station location or retrieve from URL parameter
    var defaultStation = getParameterByName('station');
    var defaultBeamwidth = getParameterByName('beamwidth') || 60; // Default beamwidth to 60 if not provided

    if (defaultStation) {
        setStationLocation(defaultStation);
    } else {
        // Use default location if no station parameter is provided
        setStationLocation('KP20ie');
        console.log('Station location not detected in URL. Using default location KP20IE.');
    }

    // Update station Maidenhead immediately upon initialization
    document.getElementById('station-maidenhead').textContent = defaultStation || 'KP20ie'; // Set default if no parameter

    // Event listener for clicking on the map
    map.on('click', function (e) {
        var clickedLatLng = e.latlng;
        
        // Ensure stationLatLng is defined before using
        if (!stationLatLng) {
            console.error('Station location is not set.');
            return;
        }

        var bearing = stationLatLng.bearingTo(clickedLatLng); // Calculate bearing from station to clicked point
        var distance = stationLatLng.distanceTo(clickedLatLng); // Calculate distance from station to clicked point
        var destinationMaidenhead = latLngToMaidenhead(clickedLatLng); // Convert clicked coordinates to Maidenhead grid locator

        // Update info panel with clicked point information
        document.getElementById('clicked-maidenhead').textContent = destinationMaidenhead;
        document.getElementById('distance').textContent = (distance / 1000).toFixed(2) + ' km';
        document.getElementById('bearing').textContent = bearing.toFixed(2) + ' degrees';

        // Clear old markers and layers
        clearMarkersAndLayers();

        // Display the clicked position as a marker with bearing, distance, and Maidenhead grid locator
        destinationMarker = L.marker(clickedLatLng).addTo(map)
            .bindPopup('Bearing: ' + bearing.toFixed(2) + ' degrees<br>' +
		       'Distance: ' + (distance / 1000).toFixed(2) + ' km<br>' +
		       'Coordinates: ' +
		       Math.abs(clickedLatLng.lat).toFixed(5) + '° ' + (clickedLatLng.lon < 0 ? 'S' : 'N') + ', ' +
		       Math.abs(clickedLatLng.lng).toFixed(5) + '° ' + (clickedLatLng.lng < 0 ? 'W' : 'E') + '<br>' +
		       'Locator: <code>' + destinationMaidenhead + '</code>')
            .openPopup();

        // Draw geodetic arc from station to clicked point
        drawGeodeticArc(stationLatLng, clickedLatLng, map);

        // Draw antenna beamwidth polygon
        var currentBeamwidth = getCurrentBeamwidth(defaultBeamwidth);
        drawAntennaBeamwidth(map, stationLatLng, bearing, currentBeamwidth, distance); // Fetch beamwidth from beamwidth.js

        // Update beamwidth field in info panel with degree sign
        document.getElementById('beamwidth').textContent = currentBeamwidth + '°'; // Append degree sign
    });
}

// Function to set station location based on Maidenhead grid locator
function setStationLocation(maidenhead) {
    console.log('Setting station location for Maidenhead Locator ', maidenhead); // Log the maidenhead locator being used
    try {
        stationLatLng = maidenheadToLatLng(maidenhead); // Convert Maidenhead grid locator to coordinates
        updateStationMarker(stationLatLng, maidenhead);
        map.setView(stationLatLng, 3); // Set map view to station location with zoom level 6
    } catch (error) {
        console.error('Error setting station location:', error.message);
    }
}

// Function to clear old markers and layers
function clearMarkersAndLayers() {
    if (destinationMarker) {
        map.removeLayer(destinationMarker);
    }
    if (geodeticArcLayer) {
        map.removeLayer(geodeticArcLayer);
    }
    if (beamwidthLayer) {
        map.removeLayer(beamwidthLayer);
    }
}

// Function to get URL parameter by name
function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Function to get the current beamwidth value, defaulting to a specified value if not set
function getCurrentBeamwidth(defaultBeamwidth) {
    return parseFloat(defaultBeamwidth) || 60; // Return the beamwidth value or default to 60
}
