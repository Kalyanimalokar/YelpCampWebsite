mapboxgl.accessToken = pk.eyJ1Ijoia2FseWFuaW1hbG9rYXIiLCJhIjoiY2xqZzZzcGlhMDh5czNncDk5M3NpYWZmaCJ9.OIhbhFPYEUIQnYsc4S3kVA
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset:25})
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map)
