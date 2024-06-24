// Define geodeticArcLayer as a global variable
var geodeticArcLayer;

// Function to calculate bearing between two points
function calculateBearing(point1, point2) {
    var lat1 = point1.lat * Math.PI / 180;
    var lat2 = point2.lat * Math.PI / 180;
    var deltaLng = (point2.lng - point1.lng) * Math.PI / 180;

    var y = Math.sin(deltaLng) * Math.cos(lat2);
    var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);
    var bearing = Math.atan2(y, x) * 180 / Math.PI;

    return (bearing + 360) % 360; // Normalize to 0-360 degrees
}

// Function to draw geodetic arc between two points
function drawGeodeticArc(point1, point2, map) {
    geodeticArcLayer = L.layerGroup().addTo(map); // Initialize the geodeticArcLayer if not already initialized

    var points = [point1, point2];

    L.geodesic([[point1, point2]], {
        weight: 2,
        color: 'red',
        opacity: 1.0
    }).addTo(geodeticArcLayer);
}
