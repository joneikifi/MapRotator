# MapRotator

> [!NOTE]
> This project has been **COMPLETELY** done by ChatGPT. I have had an extensive dialog with the ChatGPT telling what I want and I have been provided HTML and JavaScript files which I have copied and pasted to my development server and slowly with a lot of extra curves and U-turns the project has reached a milestone so that it basically works and has reached the basic functionality what I was looking for.

MapRotator is a web application that visualizes geographical bearings and distances from a given station location. This project uses Leaflet.js to display maps and allows users to interact with the map to see beamwidth and bearings.

For 'compatibility' with amateur radio world, the map uses Maidenhead Grid locators for station and destination point nomination. More information about the Maidenhead Locator System at https://en.wikipedia.org/wiki/Maidenhead_Locator_System

<p align=center>
<img height="100" src="https://github.com/OH2LAK/MapRotator/blob/main/images/GUI_screenshot.png">


## Features
- Supports both 6- and 8-character Maidenhead Locator for station location.
- Display a map centered on a station's location.
- Click on the map to see the bearing, distance, and Maidenhead grid locator of the clicked point.
- Visualize the antenna beamwidth from the station location towards the clicked point.
- Few hi-resolution APRS map icons for the station Icon, a house with 6-element antenna (maybe good for VHF) and a house with a 2-element antenna (HF stuff evidently)
<p>
<img height="55" src="https://github.com/OH2LAK/MapRotator/blob/main/images/house-antenna-HF-2-el.png">
<img height="55" src="https://github.com/OH2LAK/MapRotator/blob/main/images/house-antenna-VHF-6-el.png">
</p>

## Usage
- The web application is basically a web page and the default HTML file name is index.html so any normal web server will serve the page by default
- The station Maidenhead Locator can be passed as a URL parameter or the default locator can be set in the main.js file.
- The antenna beawidth (degrees) can be passed as a URL parameter or the default antenna beamwidth info can be set in the main.js file.

Station location can be passed in either 6- or 8-character Maidenhead Locator as a URL parameter:<br>
  `index.html?station=KP20IE or index.html?station?KP20IE55`

Antenna beamwidth can be passed in degrees as a URL parameter combined with the station location (or alone):<br>
  `index.html?station=KP20IE&beamwidth=60`

## More to be done (TO DO) 
- Interface an antenna rotator the the application to get real-time information of antenna direction
- Enable control of an antenna rotator from the web application
- Add amateur radio prefixes to the map
- Maybe show the code to someone who understands JavaScript better and just hear their opinions about AI-generated code

## Things which are broken and need to be fixed at some point
- When bearing is close to zero degrees (north) the beamwidth polygon drawing goes wrong. This is due to the beamwidth polygon drawing not being handled correctly when it crosses 360->0 degrees. This has been attempted to be fixed many times but looks like we talk different language with ChatGPT or I am just too stupid to explain it properly. The failure bearing is proportional to the antenna beamwidth, ie. when the antenna beamwidth crosses 360/0 degrees bearing, the drawing fails. If the whole beamwidth polygon stays on either side of 360/0 degrees, it works OK

### Prerequisites
- A web server such as Nginx.
