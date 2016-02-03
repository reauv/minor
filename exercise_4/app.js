import geo from './lib/geo';
import google from './lib/google';
import EventTarget from './lib/eventTarget';

/**
 * cmdaan.js
 *   Bevat functies voor CMDAan stijl geolocatie welke uitgelegd
 *   zijn tijdens het techniek college in week 5.
 *
 *   Author: J.P. Sturkenboom <j.p.sturkenboom@hva.nl>
 *   Credit: Dive into html5, geo.js, Nicholas C. Zakas
 *
 *   Copyleft 2012, all wrongs reversed.
 */
(() => {
	const ET = new EventTarget();
	const LINEAIR = 'LINEAIR';
	const GPS_AVAILABLE = 'GPS_AVAILABLE';
	const GPS_UNAVAILABLE = 'GPS_UNAVAILABLE';
	const POSITION_UPDATED = 'POSITION_UPDATED';
	const REFRESH_RATE = 1000;

	const markerRij = [];
	const debugId = false;
	const tourType = LINEAIR;
	const customDebugging = false;

	let map = false;
	let interval = false;
	let intervalCounter = false;
	let currentPosition = false;
	let currentPositionMarker = false;

	// let updateMap = false;
	// let locationRow = [];
	// let interval = false;
	//

	function debugMessage(message) {
		return (customDebugging && debugId)
			? document.getElementById(debugId).innerHTML
			: console.log(message);
	}

	function geoErrorHandler(code, message) {
		debugMessage(`geo.js error ${code}: ${message}`);
	}

	// Callback functie voor het instellen van de huidige positie, vuurt een event af
	function setPosition(position) {
		currentPosition = position;
		ET.fire('POSITION_UPDATED');
		debugMessage(
			`${intervalCounter}positie lat:${position.coords.latitude} long:"${position.coords.longitude}`
		);
	}

	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	// Bereken het verchil in meters tussen twee punten
	function calculateDistance(p1, p2) {
		const pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
		const pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
		return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);
	}

	// Controleer de locaties en verwijs naar een andere pagina als we op een locatie zijn
	function checkLocations(event) {
		let i;
		const locaties = window.locaties;

		// Liefst buiten google maps om... maar helaas, ze hebben alle coole functies
		for (i = 0; i < locaties.length; i++) {
			const locatie = { coords: { latitude: locaties[i][3], longitude: locaties[i][4] } };

			if (calculateDistance(locatie, currentPosition) < locaties[i][2]) {
				// Controle of we NU op die locatie zijn, zo niet gaan we naar de betreffende page
				if (window.location !== locaties[i][1] && localStorage[locaties[i][0]] === 'false') {
					// Probeer local storage, als die bestaat incrementeer de locatie
					try {
						(localStorage[locaties[i][0]] === 'false')
							? localStorage[locaties[i][0]] = 1
							: localStorage[locaties[i][0]]++;
					} catch (error) {
						debugMessage(`Localstorage kan niet aangesproken worden: ${error}`);
					}

					// TODO: Animeer de betreffende marker

					window.location = locaties[i][1];
					debugMessage(
						'Speler is binnen een straal van "+ locaties[i][2] +" meter van "+locaties[i][0]'
					);
				}
			}
		}
	}

	// Vraag de huidige positie aan geo.js, stel een callback in voor het resultaat
	function updatePosition() {
		intervalCounter++;
		geo.getCurrentPosition(setPosition, geoErrorHandler, { enableHighAccuracy: true });
	}

	// Update de positie van de gebruiker op de kaart
	function updatePositie(event) {
		// use currentPosition to center the map
		const newPos = new google.maps.LatLng(
			currentPosition.coords.latitude,
			currentPosition.coords.longitude
		);
		map.setCenter(newPos);
		currentPositionMarker.setPosition(newPos);
	}

	// Start een interval welke op basis van REFRESH_RATE de positie updated
	function startInterval() {
		debugMessage('GPS is beschikbaar, vraag positie.');
		updatePosition();
		interval = self.setInterval(updatePosition, REFRESH_RATE);
		ET.addListener(POSITION_UPDATED, checkLocations);
	}

	// GOOGLE MAPS FUNCTIES
	/**
	 * generate_map(myOptions, canvasId)
	 *  roept op basis van meegegeven opties de google maps API aan
	 *  om een kaart te genereren en plaatst deze in het HTML element
	 *  wat aangeduid wordt door het meegegeven id.
	 *
	 *  @param myOptions:object - een object met in te stellen opties
	 *      voor de aanroep van de google maps API, kijk voor een over-
	 *      zicht van mogelijke opties op http://
	 *  @param canvasID:string - het id van het HTML element waar de
	 *      kaart in ge-rendered moet worden, <div> of <canvas>
	 */
	function generateMap(myOptions, canvasId) {
		let i;
		let route;
		let marker;
		const routeList = [];
		const locaties = window.locaties;
		const kaartOpties = window.kaartOpties;
		const positieMarker = window.positieMarker;
		const locatieMarker = window.locatieMarker;
		const markerLatLng = new google.maps.LatLng(locaties[i][3], locaties[i][4]);

		// TODO: Kan ik hier asynchroon nog de google maps api aanroepen? dit scheelt calls
		debugMessage(`Genereer een Google Maps kaart en toon deze in #${canvasId}`);
		map = new google.maps.Map(document.getElementById(canvasId), myOptions);
    // Voeg de markers toe aan de map afhankelijk van het tourtype
		debugMessage(`Locaties intekenen, tourtype is: ${tourType}`);
		for (i = 0; i < locaties.length; i++) {
			// Met kudos aan Tomas Harkema, probeer local storage, als het bestaat, voeg de locaties toe
			try {
				(localStorage.visited === undefined || isNumber(localStorage.visited))
					? localStorage[locaties[i][0]] = false
					: null;
			} catch (error) {
				debugMessage(`Localstorage kan niet aangesproken worden: ${error}`);
			}

			routeList.push(markerLatLng);

			markerRij[i] = {};

			for (const attr in locatieMarker) {
				markerRij[i][attr] = locatieMarker[attr];
			}

			markerRij[i].scale = locaties[i][2] / 3;

			marker = new google.maps.Marker({
				map,
				position: markerLatLng,
				icon: markerRij[i],
				title: locaties[i][0],
			});
		}

		// TODO: Kleur aanpassen op het huidige punt van de tour
		if (tourType === LINEAIR) {
			// Trek lijnen tussen de punten
			debugMessage('Route intekenen');
			route = new google.maps.Polyline({
				map,
				clickable: false,
				path: routeList,
				strokeColor: 'Black',
				strokeOpacity: 0.6,
				strokeWeight: 3,
			});
		}

    // Voeg de locatie van de persoon door
		currentPositionMarker = new google.maps.Marker({
			map,
			position: kaartOpties.center,
			icon: positieMarker,
			title: 'U bevindt zich hier',
		});

    // Zorg dat de kaart geupdated wordt als het POSITION_UPDATED event afgevuurd wordt
		ET.addListener(POSITION_UPDATED, updatePositie);
	}

	debugMessage('Controleer of GPS beschikbaar is...');

	ET.addListener(GPS_AVAILABLE, startInterval);
	ET.addListener(GPS_UNAVAILABLE, () => debugMessage('GPS is niet beschikbaar.'));

	(geo.init())
		? ET.fire(GPS_AVAILABLE)
		: ET.fire(GPS_UNAVAILABLE);
})();
