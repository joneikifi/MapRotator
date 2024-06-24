// maidenhead.js

// Function to convert Maidenhead grid locator to latitude and longitude
function maidenheadToLatLng(maidenhead) {

    maidenhead = maidenhead.toUpperCase(); // Ensure Maidenhead Locator is set all uppercase

    if (maidenhead.length !== 6 && maidenhead.length !== 8) {
        throw new Error('Invalid Maidenhead grid format');
    }

    var A = 'A'.charCodeAt(0);
    var zero = '0'.charCodeAt(0);

    var lon = (maidenhead.charCodeAt(0) - A) * 20 - 180;
    // console.log('Longitude after first two characters:', lon);
    var lat = (maidenhead.charCodeAt(1) - A) * 10 - 90;
    // console.log('Latitude after first two characters:', lat);
    lon += (maidenhead.charCodeAt(2) - zero) * 2;
    // console.log('Longitude after third character:', lon);
    lat += (maidenhead.charCodeAt(3) - zero);
    // console.log('Latitude after third character:', lat);

    var a = 'A'.charCodeAt(0); // for lowercase letters
    lon += (maidenhead.charCodeAt(4) - a) / 12;
    // console.log('Longitude after fourth character:', lon);
    lat += (maidenhead.charCodeAt(5) - a) / 24;
    // console.log('Latitude after fourth character:', lat);

    if (maidenhead.length === 8) {
        lon += (maidenhead.charCodeAt(6) - zero) / 240;
        lat += (maidenhead.charCodeAt(7) - zero) / 240;
    }

    // Adjust to the center of the square
    if (maidenhead.length === 6) {
        lon += 1 / 24; // Adjust for the center of the 1x2 degree square
        lat += 1 / 48;
    } else if (maidenhead.length === 8) {
        lon += 1 / 48; // Adjust for the center of the 0.5x1 degree square
        lat += 1 / 96;
    }

    console.log('Maidenhead', maidenhead, 'converted to lon', lon, 'lat', lat); // Log the conversion result with original Maidenhead Locator
    return L.latLng(lat, lon);
}

// Function to convert coordinates to Maidenhead grid locator
function latLngToMaidenhead(latlng) {
    console.log('Input Coordinates:', latlng); // Log the input coordinates

    var A = 'A'.charCodeAt(0);
    var a = 'a'.charCodeAt(0);

    // Adjust latitude to be within [-90, 90]
    var lat = latlng.lat;
    while (lat < -90) lat += 180;
    while (lat > 90) lat -= 180;

    // Adjust longitude to be within [-180, 180]
    var lon = latlng.lng;
    while (lon < -180) lon += 360;
    while (lon > 180) lon -= 360;

    // Calculate field (first pair) and square (second pair)
    var field = String.fromCharCode(A + Math.floor((lon + 180) / 20));
    var square = String.fromCharCode(A + Math.floor((lat + 90) / 10));

    // Calculate subsquare (third pair and fourth pair)
    var lon_remainder = (lon + 180) % 20;
    var lat_remainder = (lat + 90) % 10;
    var subsquare1 = Math.floor(lon_remainder / 2).toString();
    var subsquare2 = Math.floor(lat_remainder).toString();

    // Calculate extended square (fifth pair and sixth pair)
    var extSquare1 = String.fromCharCode(a + Math.floor((lon_remainder % 2) * 12));
    var extSquare2 = String.fromCharCode(a + Math.floor((lat_remainder % 1) * 24));

    // Construct the Maidenhead grid locator
    var locator = field + square + subsquare1 + subsquare2 + extSquare1 + extSquare2;

    console.log('Adjusted Coordinates - Lat:', lat, 'Lon:', lon); // Log adjusted coordinates

    console.log('Maidenhead Locator:', locator); // Log the generated Maidenhead grid locator

    return locator;
}
