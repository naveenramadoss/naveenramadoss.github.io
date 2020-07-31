async function init() {
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    //d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
    
    d3.csv("/dataset/time_series_covid19_deaths_global_1st_quarter.csv",
    
    // When reading the csv, I must format variables:
    function(d){
        return { date : d3.timeParse("%Y-%m-%d")(d.Date), value : d.TotalDeaths }
        //return { date : d3.timeParse("%m/%d/%Y")(d.date), value : d.TotalDeaths }
    },

    // Now I can use this dataset:
    function(data) {

        // Add X axis --> it is a date format
        var x = d3.scaleTime()
          .domain(d3.extent(data, function(d) { return d.date; }))
          .range([ 0, width ]);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
          //.domain([0, d3.max(data, function(d) { return +d.value; })])
          .domain([0,70000])
          .range([ height, 0 ]);
        svg.append("g")
          .call(d3.axisLeft(y));

        // Add the line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.value) })
            )
    })
}

function secondQuarter() {
    alert("Inside 2nd")
    // Clear the area
    d3.select("#my_dataviz").innerHTML = "";
    
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    //d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
    
    d3.csv("/dataset/time_series_covid19_deaths_global_2nd_quarter.csv",
    
    // When reading the csv, I must format variables:
    function(d){
        return { date : d3.timeParse("%Y-%m-%d")(d.Date), value : d.TotalDeaths }
        //return { date : d3.timeParse("%m/%d/%Y")(d.date), value : d.TotalDeaths }
    },

    // Now I can use this dataset:
    function(data) {

        // Add X axis --> it is a date format
        var x = d3.scaleTime()
          .domain(d3.extent(data, function(d) { return d.date; }))
          .range([ 0, width ]);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
          //.domain([0, d3.max(data, function(d) { return +d.value; })])
          .domain([0,70000])
          .range([ height, 0 ]);
        svg.append("g")
          .call(d3.axisLeft(y));

        // Add the line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.value) })
            )
    })
}

function thirdQuarter() {
    alert("Inside 3rd")
    // Clear the area
    d3.select("#my_dataviz").innerHTML = "";
    
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    //d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
    
    d3.csv("/dataset/time_series_covid19_deaths_global_3rd_quarter.csv",
    
    // When reading the csv, I must format variables:
    function(d){
        return { date : d3.timeParse("%Y-%m-%d")(d.Date), value : d.TotalDeaths }
        //return { date : d3.timeParse("%m/%d/%Y")(d.date), value : d.TotalDeaths }
    },

    // Now I can use this dataset:
    function(data) {

        // Add X axis --> it is a date format
        var x = d3.scaleTime()
          .domain(d3.extent(data, function(d) { return d.date; }))
          .range([ 0, width ]);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
          //.domain([0, d3.max(data, function(d) { return +d.value; })])
          .domain([0,70000])
          .range([ height, 0 ]);
        svg.append("g")
          .call(d3.axisLeft(y));

        // Add the line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.value) })
            )
    })
}