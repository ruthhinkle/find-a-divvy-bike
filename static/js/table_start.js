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
            "capacity",
            "rental_methods",
            "lat",
            "lon"
        ];

        // Step 1: Loop Through `data` for each sighting.
           
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

    function clickButton() {
        var name = d3.select("#place").property("value");
        var capacity = d3.select("#capacity").property("value");
        var stationType = d3.select("#station-type").property("value");

        var nameData = stationArray.filter(stations => stations.name === name);
        var capacityData = stationArray.filter(stations => stations.capacity === capacity);
        var typeData = stationArray.filter(stations => stations.station_type === stationType);
        var combinedData = stationArray.filter(stations => stations.name === name, stations => stations.capacity === capacity, stations => stations.station_type === stationType);

        let response = {
            nameData, capacityData, typeData, combinedData
        }
    
        if (response.combinedData.length !== 0) {
            buildTable(combinedData);
        }
            else if (response.combinedData.length === 0 && ((response.nameData.length !== 0 || response.typeData.length !== 0 || response.capacityData.length !== 0))){
                buildTable(capacityData) || buildTable(typeData) || buildTable(nameData);
        
            }
            else {
                tbody.html("");
                tbody.append("tr").append("td").text("No results found!"); 
            }
    };
        // buildTable(nameData);

    // on click
    d3.selectAll("#filter-btn").on("click", clickButton);   
});
     


