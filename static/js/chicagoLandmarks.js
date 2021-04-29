// Create a map object.
var myMap = L.map("map", {
  center: [41.8643, -87.6390],
  zoom: 11
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// An array containing each landmark's name, location, and significance
var landmarks = [{
  location: [41.8759, -87.6189],
  name: "Buckingham Fountain",
  text: "Tourist Attraction"
},
{
  location: [41.8828, -87.6233],
  name: "Cloud Gate",
  text: "Tourist Attraction"
},
{
  location: [41.8855, -87.6274],
  name: "Chicago Theater",
  text: "Tourist Attraction"
},
{
  location: [41.8527, -87.6320],
  name: "Chinatown",
  text: "Tourist Attraction"
},
{
  location: [41.8780, -87.6315],
  name: "Downtown Chicago",
  text: "The Loop"
},
{
  location: [41.8881, -87.6290],
  name: "Marina City",
  text: "Iconic Landmark"
  },
{
  location: [41.8796, -87.6237],
  name: "Art Institute",
  text: "Tourist Attraction"
},
{
  location: [41.9486, -87.6553],
  name: "Wrigley Field",
  text: "Home of The Cubs"
  },
{
  location: [41.8301, -87.6337],
  name: "U.S. Cellular Field",
  text: "Home of The White Sox"
}, 
{
  location: [41.8808, -87.6742],
  name: "United Center",
  text: "Home of The Bulls & Blackhawks"
},
{
  location: [41.8919, -87.6100],
  name: "Navy Pier",
  text: "Tourist Attraction"
}, 
{
  location: [41.9220, -87.6645],
  name: "Pequods",
  text: "Best Pizza in Chicago"
}, 
{
  location: [41.8627, -87.6166],
  name: "Soldier Field",
  text: "Home of The Bears"
}, 
{
  location: [41.9217, -87.6336],
  name: "Lincoln Park Zoo",
  text: "Tourist Attraction"
},
{
  location: [41.8864, -87.7172],
  name: "Garfield Park Conservatory",
  text: "Tourist Attraction"
}
];

// Looping through the landmarks array, create one marker for each landmark, bind a popup containing its name and significance, and add it to the map.
for (var i = 0; i < landmarks.length; i++) {
  var landmark = landmarks[i];
  L.marker(landmark.location)
    .bindPopup("<h1>" + landmark.name + "</h1> <hr> <h3>Significance: " + landmark.text + "</h3>")
    .addTo(myMap);
}
