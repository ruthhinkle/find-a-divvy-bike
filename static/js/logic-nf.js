  // Create the tile layer that will be the background of our map.
  var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Initialize all the LayerGroups that we'll use.
  var layers = {
    EMPTY: new L.LayerGroup(),
    LOW: new L.LayerGroup(),
    NORMAL: new L.LayerGroup(),
  };

  // Create the map with our layers.
  var map = L.map("map-id", {
    center: [41.88, -87.62],
    zoom: 11,
    layers: [
      layers.EMPTY,
      layers.LOW,
      layers.NORMAL,
    ]
  });

  // Add our "streetmap" tile layer to the map.
  streetmap.addTo(map);

  // Create an overlays object to add to the layer control.
  var overlays = {
    "Empty Stations": layers.EMPTY,
    "Low Stations": layers.LOW,
    "Full Stations": layers.NORMAL,
  };

  // Create a control for our layers, and add our overlays to it.
  L.control.layers(null, overlays).addTo(map);

  // Create a legend to display information about our map.
  var info = L.control({
    position: "bottomright"
  });

  // When the layer control is added, insert a div with the class of "legend".
  info.onAdd = function () {
    var div = L.DomUtil.create("div", "legend");
    return div;
  };
  // Add the info legend to the map.
  info.addTo(map);

  // Initialize an object that contains icons for each layer group.
  var icons = {
    EMPTY: L.ExtraMarkers.icon({
      // icon: "ion-android-bicycle",
      iconColor: "white",
      markerColor: "red",
      shape: "circle"
    }),
    LOW: L.ExtraMarkers.icon({
      // icon: "ion-android-bicycle",
      iconColor: "white",
      markerColor: "orange",
      shape: "circle"
    }),
    NORMAL: L.ExtraMarkers.icon({
      // icon: "ion-android-bicycle",
      iconColor: "white",
      markerColor: "green",
      shape: "circle"
    })
  };

  // Perform an API call to the Divvy Bike station information endpoint.
  d3.json("https://gbfs.divvybikes.com/gbfs/en/station_information.json").then(function (infoRes) {


    // When the first API call completes, perform another call to the Divvy Bike station status endpoint.
    d3.json("https://gbfs.divvybikes.com/gbfs/en/station_status.json").then(function (statusRes) {
      var updatedAt = infoRes.last_updated;
      var stationStatus = statusRes.data.stations;
      var stationInfo = infoRes.data.stations;

      // Create an object to keep the number of markers in each layer.
      var stationCount = {
        EMPTY: 0,
        LOW: 0,
        NORMAL: 0,
      };

      // Initialize stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for the layer group.
      var stationStatusCode;

      // Loop through the stations (they're the same size and have partially matching data).
      for (var i = 0; i < stationInfo.length; i++) {

        // Create a new station object with properties of both station objects.
        var station = Object.assign({}, stationInfo[i], stationStatus[i]);

        // If a station has no available bikes, it's empty.
        if (!station.num_bikes_available) {
          stationStatusCode = "EMPTY";
        }

        // If a station has less than five bikes, it's status is low.
        else if (station.num_bikes_available < 5) {
          stationStatusCode = "LOW";
        }
        // Otherwise, the station is normal.
        else {
          stationStatusCode = "NORMAL";
        }

        // Update the station count.
        stationCount[stationStatusCode]++;

        // Create a new marker with the appropriate icon and coordinates.
        var newMarker = L.marker([station.lat, station.lon], {
          icon: icons[stationStatusCode]
        });

        // // Add the new marker to the appropriate layer.
        newMarker.addTo(layers[stationStatusCode]);

        // Bind a popup to the marker that will  display on being clicked. This will be rendered as HTML.
        newMarker.bindPopup("<h5>" + station.name + "</h5>" + "<h6><br> Capacity: " + station.capacity + "<br>" + station.num_bikes_available + " Bikes Available </h6>");
      }

      // Call the updateLegend function, which will update the legend!
      updateLegend(updatedAt, stationCount);
    });
  });

  // Update the legend's innerHTML with the last updated time and station count.
  function updateLegend(time, stationCount) {
    document.querySelector(".legend").innerHTML = [
      "<p><strong>Station Bike Capacity</strong></p>",
      "<p class='empty'>Empty: " + stationCount.EMPTY + "</p>",
      "<p class='low'>Low: " + stationCount.LOW + "</p>",
      "<p class='full'>Full: " + stationCount.NORMAL + "</p>",
      "<p><em>Updated: " + moment.unix(time).format("h:mm:ss A") + "</em></p>"
    ].join("");
  }

//ebikes toggling
function bikeeToggle(bikeType) {
  //destroy previous layers
  map.eachLayer(function (layer) {
    map.removeLayer(layer);
  });
  var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  streetmap.addTo(map)

  //create new layer
  var ebikelayer = new L.LayerGroup()
  //create empty layers group
  d3.json("https://gbfs.divvybikes.com/gbfs/en/station_information.json").then(function (infoRes) {

    d3.json("https://gbfs.divvybikes.com/gbfs/en/station_status.json").then(function (statusRes) {
      var updatedAt = infoRes.last_updated;
      var stationStatus = statusRes.data.stations;
      var stationInfo = infoRes.data.stations;

      // Loop through the stations (they're the same size and have partially matching data).
      for (var i = 0; i < stationInfo.length; i++) {

        // Create a new station object with properties of both station objects.
        var station = Object.assign({}, stationInfo[i], stationStatus[i]);

        // If a station has no available ebikes, it's empty.
        if (station.num_ebikes_available) {
          // Create a new marker with the appropriate icon and coordinates.
          var newMarker = L.marker([station.lat, station.lon])
            .bindPopup("<h5>" + station.name + "</h5>" + "<h6><br> Capacity: " + station.capacity + "<br>" + station.num_ebikes_available + " eBikes Available </h6>")
          newMarker.addTo(ebikelayer);
        }
      }
      ebikelayer.addTo(map)
    });
  })
};

//Classic bikes toggling
function bikecToggle(bikeType) {
  //destroy previous layers
  map.eachLayer(function (layer) {
    map.removeLayer(layer);
  });
  var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  streetmap.addTo(map)
  var classicbikelayer = new L.LayerGroup()

  //create empty layers group
  d3.json("https://gbfs.divvybikes.com/gbfs/en/station_information.json").then(function (infoRes) {

    d3.json("https://gbfs.divvybikes.com/gbfs/en/station_status.json").then(function (statusRes) {
      var updatedAt = infoRes.last_updated;
      var stationStatus = statusRes.data.stations;
      var stationInfo = infoRes.data.stations;

      // Loop through the stations (they're the same size and have partially matching data).
      for (var i = 0; i < stationInfo.length; i++) {

        // Create a new station object with properties of both station objects.
        var station = Object.assign({}, stationInfo[i], stationStatus[i]);
        var num_classic_bikes_available = station.num_bikes_available - station.num_ebikes_available
        console.log(num_classic_bikes_available)

        // If a station has no available ebikes, it's empty.
        if (num_classic_bikes_available) {
          // Create a new marker with the appropriate icon and coordinates.
          var newMarker = L.marker([station.lat, station.lon])
            .bindPopup("<h5>" + station.name + "</h5>" + "<h6><br> Capacity: " + station.capacity + "<br>" + num_classic_bikes_available + " Classic Bikes Available </h6>")
          newMarker.addTo(classicbikelayer);
        }
      } classicbikelayer.addTo(map)
    });


  })
};
