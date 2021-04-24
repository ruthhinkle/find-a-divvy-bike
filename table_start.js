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
    // console.log(stationArray)

    function buildTable(stationArray) {

        tbody.html("");

        var columns = [
            "name",
            "rental_methods",
            "lat",
            "lon"
        ];

        // Step 2: Use d3 to append one table row `tr` for each sightings report object
        // Step 3: Use `Object.entries` to pull each sightings report value
        stationArray.forEach(function(station) {
            var row = tbody.append("tr")
        
            columns.forEach(function(key) {
                var cell = row.append("td");
                // Step 5: Use d3 to update each cell's text with sightings values
                cell.text(station[key]);
            });
        });

    }
    buildTable(stationArray)
});    
