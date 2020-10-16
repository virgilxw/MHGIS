// Initialise map
var mainmap = L.map('mapcont').setView([4.2, 108.00], 6);

// Load basemap
var streetmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mainmap);

// Load GeoJSON file
var points = new L.GeoJSON.AJAX("./json/myhg_master.geojson")

points.on('data:loaded', function () {
    var markers = new L.markerClusterGroup();
    markers.addLayer(points)
    mainmap.addLayer(markers)

    points.on("click", function (event) {

        var properties = event.layer.feature.properties

        var text_string = "<h2>" + properties.Name_EN + "</h2><h3>" + properties.Name_CH + "</h3><h3>" + properties.Name_ML + "</h3>" + "<p><b>Location: </b>" + properties.Location + "</p><p><b>State: </b>" + properties.Region + "</p>"

        var popup = L.popup({
                maxHeight: 500,
                maxWidth: 600,
                closeOnClick: false,
                keepInView: true
            })
            .setLatLng(event.latlng)
            .setContent(text_string)
            .openOn(mainmap);
    })
})


var villages_new = new L.GeoJSON.AJAX("./json/Villages_new.geojson")
var towns_new = new L.GeoJSON.AJAX("./json/TownsNEW.geojson")
var temples_new = new L.GeoJSON.AJAX("./json/Temples_new.geojson")

var baseMaps = []
var overlays = [{
    groupName: "New Layers",
    expanded: true,
    layers: {
        "Villages_new": villages_new,
        "towns_new": towns_new,
        "temples_new": temples_new
    }
    }]

var options = {
    container_width: "300px",
    container_maxHeight: "700px",
    group_maxHeight: "250px",
    groupCheckboxes: true,
    removeOutsideVisibleBounds: true
};

var control = L.Control.styledLayerControl(baseMaps, overlays, options);
mainmap.addControl(control);


$(document).ready(function () {
    mainmap.invalidateSize()
})
