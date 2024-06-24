// beamwidth.js

var currentBeamwidth = 10; // Example: Set the default beamwidth to 60 degrees

function getCurrentBeamwidth() {
    return currentBeamwidth;
}

function drawAntennaBeamwidth(map, centerPoint, bearing, widthDegrees, distance) {
    beamwidthLayer = L.layerGroup().addTo(map);

    // Increase the distance by 10%
    var longerDistance = distance * 1.1;

    var beamwidth = widthDegrees / 2;
    var beamPoints = [];

    // Calculate a proportional step size based on the distance
    var step = Math.max(50, Math.ceil(longerDistance / 200)); // Ensure a minimum step of 50 meters

    var maxIterations = Math.ceil(longerDistance / step); // Use longer distance for iterations

    // Calculate bearings for left and right edges of the beamwidth
    var leftBearing = (bearing - beamwidth + 360) % 360;
    var rightBearing = (bearing + beamwidth + 360) % 360;

    // Adjust rightBearing if it exceeds 360 degrees
    if (rightBearing >= 360) {
        rightBearing -= 360;
    }

    // Generate points for the beamwidth polygon
    for (var i = 0; i <= maxIterations; i++) {
        var leftDestination = centerPoint.destination(i * step, leftBearing);
        var rightDestination = centerPoint.destination(i * step, rightBearing);

        beamPoints.push([leftDestination.lat, leftDestination.lng]);
        beamPoints.unshift([rightDestination.lat, rightDestination.lng]);
    }

    console.log('Left Bearing:', leftBearing,'right bearing:', rightBearing,'stepping',step);

   

    // Close the polygon
    beamPoints.push([beamPoints[0][0], beamPoints[0][1]]);

    L.polygon(beamPoints, {
        weight: 1,
        opacity: 0.3,
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.3
    }).addTo(beamwidthLayer);

    // Update beamwidth info in the info panel
    document.getElementById('beamwidth').textContent = getCurrentBeamwidth(); // Fetch beamwidth from beamwidth.js
}
