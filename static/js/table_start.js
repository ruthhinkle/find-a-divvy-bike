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

        stationArray = stationArray.sort(function(a, b){ return b.capacity - a.capacity});

        // console.log(stationArray)
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

// ====
    function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    function convertWildcardStringToRegExp(expression) {
        var terms = expression.split('*');
    
        var trailingWildcard = false;
    
        var expr = '';
        for (var i = 0; i < terms.length; i++) {
            if (terms[i]) {
                if (i > 0 && terms[i - 1]) {
                    expr += '.*';
                }
                trailingWildcard = false;
                expr += escapeRegExp(terms[i]);
            } else {
                trailingWildcard = true;
                expr += '.*';
            }
        }
    
        if (!trailingWildcard) {
            expr += '.*';
        }
    
        return new RegExp('^' + expr + '$', 'i');
    }
    
    // // ===================================================================================
    // // Testing...
    
    // var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    
    // var filter = '*kans';
    
    function filterArray(array, expression) {
        var regex = convertWildcardStringToRegExp(expression);
        //console.log('RegExp: ' + regex);
        return array.filter(function(item) {
            return regex.test(item);
        });
    }
    
    // console.log(filterArray(states, filter));

// ====

    function clickButton() {
        // console.log("hello world")
        var name = d3.select("#place").property("value").toLowerCase();
        var capacity = d3.select("#capacity").property("value");
        
        var nameArray = stationArray.map(station => station.name)
        var filtered_names = filterArray(nameArray, name);
        // console.log(filtered_names)

        // var nameData = stationArray.filter(stations => filtered_names.includes(stations.name));
        // var capacityData = stationArray.filter(stations => stations.capacity >= capacity);
        var combinedData = stationArray.filter(stations => (stations && stations.name || '').toLowerCase().includes(name)).filter(stations => stations.capacity >= capacity);
        console.log(name, capacity)
        let response = {
             combinedData
        }
        debugger
        if (response.combinedData.length !== 0) {
            buildTable(combinedData)
            console.log(response.combinedData.length, "combined Data");
        }

            else {
                tbody.html("");
                tbody.append("tr").append("td").text("No results found!"); 
            }
    };

    // on click
    d3.selectAll("#filter-btn").on("click", clickButton);   
});
     


