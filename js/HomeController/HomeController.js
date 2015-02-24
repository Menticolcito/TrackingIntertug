var markers = [], mapa, mc = null;
function initmap() {
    var centro = new google.maps.LatLng(9.024365, -72.913396);
    var opciones = {
        zoom: 4,
        center: centro,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        mapTypeControl: true,
        streetViewControl: false,
        scaleControl: true,
        mapTypeControlOptions: {position: google.maps.ControlPosition.LEFT_TOP},
        zoomControlOptions: {position: google.maps.ControlPosition.LEFT_CENTER},
        panControlOptions: {position: google.maps.ControlPosition.LEFT_CENTER},
        scaleControlOptions: {position: google.maps.ControlPosition.BOTTOM_CENTER}
    };
    mapa = new google.maps.Map(document.getElementById("map-canvas"), opciones);
    try {
        getVesselsRequest(setMarkers);
        setInterval(getVesselsRequest, 60000, setMarkers);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

function setMarkers(vessels) {
    if (mc !== null) {
        mc.clearMarkers();
    }
    markers = [], mc = null, vessels = vessels.vessel;
    var infowindow = null;
    infowindow = new google.maps.InfoWindow({
        content: ""
    });
    for (i = 0; i < vessels.length; i++) {
        var content = "<h6>" + vessels[i].vesselname + " </h6>"
                + "<b> Velocidad </b>: " + vessels[i].speed + " Nudos<br>"
                + "<b> Fecha </b>: " + vessels[i].gpsdate
                + "<br><br>";
        var position = new google.maps.LatLng(vessels[i].lat, vessels[i].long);
        var marcador = new google.maps.Marker({
            position: position,
            icon: '../imgs/ship.png',
            draggable: false,
            title: vessels[i].vesselname,
            zIndex: 1,
            html: content
        });
        markers[i] = marcador;
        google.maps.event.addListener(marcador, 'mouseover', function () {
            infowindow.setContent(this.html);
            infowindow.open(mapa, this);
        });
        google.maps.event.addListener(marcador, 'mouseout', function () {
            infowindow.close();
        });
    }
    var clusterOptions = {gridSize: 60, maxZoom: 12};
    mc = new MarkerClusterer(mapa, markers, clusterOptions);
}