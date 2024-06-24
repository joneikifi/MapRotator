# MapRotator

This project has been COMPLETELY done by ChatGPT. I have had extensive dialog with the ChatGPT telling what I want and I have been provided HTML and JavaScript files which I have copied and pasted to my development server and slowly with a lot of extra curves and U-turns the project has reached a milestone

MapRotator is a web application that visualizes geographical bearings and distances from a given station location. This project uses Leaflet.js to display maps and allows users to interact with the map to see beamwidth and bearings.

## Features
- Display a map centered on a station's location.
- Click on the map to see the bearing, distance, and Maidenhead grid locator of the clicked point.
- Visualize the antenna beamwidth from the station location towards the clicked point.
- Few hi-resolution APRS map icons for the station Icon, a house with 6-element antenna (maybe good for VHF) and a house with a 2-element antenna (HF stuff evidently)

## More to be done (TO DO) 
- Interface an antenna rotator the the application to get real-time information of antenna direction
- Enable control of an antenna rotator from the web application
- Add amateur radio prefixes to the map

## Things which are broken and need to be fixed at some point
- When bearing is close to zero degrees (north) the beamwidth polygon drawing goes wrong. This is due to the beamwidth polygon drawing not being handled correctly when it crosses 360->0 degrees. This has been attempted to be fixed many times but looks like we talk different language with ChatGPT or I am just too stupid to explain it properly. The failure bearing is proportional to the antenna beamwidth, ie. when the antenna beamwidth crosses 360/0 degrees bearing, the drawing fails. If the whole beamwidth polygon stays on either side of 360/0 degrees, it works OK

### Prerequisites
- A web server such as Nginx.

### Local Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/MapRotator.git
   cd MapRotator
