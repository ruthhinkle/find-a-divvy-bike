url = "https://gbfs.divvybikes.com/gbfs/en/station_information.json"

// d3.json(url).then(function(divvyData) {
    
//     console.log(divvyData)

//     // allStations = divvyData.data
//     // stationArray = allStations.stations
//     // stationList = []
//     // console.log(stationArray)
//     // for (var i = 0; i < stationArray.length; i++) {
//     //     console.log(stationArray[i].name)
//     //     stationList.push(stationArray[i].name)
//     // }

//     // console.log(stationArray)
// })

d3.json(url).then(function(divvyData) {

    var tbody = d3.select("tbody");
    var allStations = divvyData.data
    var stationArray = allStations.stations
    console.log(stationArray)

    function buildTable(stationArray) {

        tbody.html("");
        // Step 1: Loop Through `data` for each sighting.
        stationArray.forEach(function(stations) {
            
            // Step 2: Use d3 to append one table row `tr` for each sightings report object
            var row = tbody.append("tr")
            // Step 3: Use `Object.entries` to pull each sightings report value
            Object.entries(stations).forEach(function([key, value]) {
                // Step 4: Use d3 to append 1 cell per sightings report value
                //(datetime, city, state, country, shape, durationMinutes, comments)   
                var cell = row.append("td");
                // Step 5: Use d3 to update each cell's text with sightings values
                cell.text(value);
            });

        });
        
    }
    buildTable(stationArray)
});    
