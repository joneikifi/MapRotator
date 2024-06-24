// Function to get URL parameters
function getUrlParameter(name) {
    var regex = new RegExp('[?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Extend the L.LatLng class to add bearingTo method
L.LatLng.prototype.bearingTo = function(otherLatLng) {
    var lat1 = this.lat * Math.PI / 180;
    var lat2 = otherLatLng.lat * Math.PI / 180;
    var deltaLng = (otherLatLng.lng - this.lng) * Math.PI / 180;

    var y = Math.sin(deltaLng) * Math.cos(lat2);
    var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);
    var bearing = Math.atan2(y, x) * 180 / Math.PI;

    return (bearing + 360) % 360; // Normalize to 0-360 degrees
};

// Extend the L.LatLng class to add destination method
L.LatLng.prototype.destination = function(distance, bearing) {
    var R = 6371e3; // Radius of the Earth in meters
    var delta = distance / R; // Angular distance in radians
    var theta = bearing * Math.PI / 180; // Bearing in radians

    var phi1 = this.lat * Math.PI / 180; // Current latitude in radians
    var lambda1 = this.lng * Math.PI / 180; // Current longitude in radians

    var phi2 = Math.asin(Math.sin(phi1) * Math.cos(delta) +
        Math.cos(phi1) * Math.sin(delta) * Math.cos(theta));

    var lambda2 = lambda1 + Math.atan2(Math.sin(theta) * Math.sin(delta) * Math.cos(phi1),
        Math.cos(delta) - Math.sin(phi1) * Math.sin(phi2));

    return L.latLng(phi2 * 180 / Math.PI, lambda2 * 180 / Math.PI);
};
