function init(){
    d3.select("#my_dataviz").html("");
    
    // Set the title and parameter for this scene
    d3.select("#my_dataviz_title").html("<h2>Line chart showing the total number of global death cases due to Covid for Quarter1(2020).");
    d3.select("#my_dataviz_chart").html("Q1(Jan-March)");
    
    d3.select("#initbutton").classList.add("btn");
    
    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
              
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("display", "none");
    
    var parseDate = d3.timeParse("%Y-%m-%d"),
        bisectDate = d3.bisector(function(d) { return d.date; }).left,
        formatValue = d3.format(","),
        dateFormatter = d3.timeFormat("%m/%d/%y");
    
    //Read the data
    d3.csv("dataset/time_series_covid19_deaths_global_1st_quarter.csv",
    
    // When reading the csv, I must format variables:
    function(d){
        return { date : d3.timeParse("%Y-%m-%d")(d.Date), value : d.TotalDeaths }
        //return { date : d3.timeParse("%m/%d/%Y")(d.date), value : d.TotalDeaths }
    },

    // Now I can use this dataset:
    function(error, data) {
        if (error) throw error;
        
        data.forEach(function(d) {
            //d.date = parseDate(d.date);
            d.deaths = +d.value;
        });
        
        // Add X axis --> it is a date format
        var x = d3.scaleTime()
          .domain(d3.extent(data, function(d) { return d.date; }))
          .range([ 0, width ]);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
          .domain([0, d3.max(data, function(d) { return +d.value; })])
          //.domain([0,700000])
          .range([ height, 0 ]);
        svg.append("g")
          .call(d3.axisLeft(y))
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .attr('fill','black')
          .text("Total number of Deaths");

        // Add the line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "#6F257F")
          .attr("stroke-width", 3)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.value) })
            )
        
        // Add annotation to the chart
        svg.append('text').text('Covid deaths from Jan to March.')
            .attr('x',500)
            .attr('y',300)
            .attr('fill','red')
            .attr('font-size',10)
            .attr('font-family','Verdana')
            
        // Adding tooltip
        var focus = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("circle")
            .attr("r", 5);

        var tooltipDate = tooltip.append("div")
            .attr("class", "tooltip-date");

        var tooltipLikes = tooltip.append("div");
        tooltipLikes.append("span")
            .attr("class", "tooltip-title")
            .text("Deaths: ");

        var tooltipLikesValue = tooltipLikes.append("span")
            .attr("class", "tooltip-likes");

        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function() { focus.style("display", null); tooltip.style("display", null);  })
            .on("mouseout", function() { focus.style("display", "none"); tooltip.style("display", "none"); })
            .on("mousemove", mousemove);

        function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            focus.attr("transform", "translate(" + x(d.date) + "," + y(d.deaths) + ")");
            tooltip.attr("style", "left:" + (x(d.date) + 64) + "px;top:" + y(d.deaths) + "px;");
            tooltip.select(".tooltip-date").text(dateFormatter(d.date));
            tooltip.select(".tooltip-likes").text(formatValue(d.deaths));
        }
    })  
}

function secondQuarter() {
    // Clear the area
    d3.select("#my_dataviz").html("");
    
    // Set the title and parameter for this scene
    d3.select("#my_dataviz_title").html("<h2>Line chart showing the total number of global death cases due to Covid for Quarter2(2020)");
    d3.select("#my_dataviz_chart").html("Q2(Apr-Jun)");

    // set the dimensions and margins of the graph
    //var margin = {top: 10, right: 30, bottom: 30, left: 60},
    //    width = 460 - margin.left - margin.right,
    //    height = 400 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
              
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("display", "none");
    
    var parseDate = d3.timeParse("%Y-%m-%d"),
        bisectDate = d3.bisector(function(d) { return d.date; }).left,
        formatValue = d3.format(","),
        dateFormatter = d3.timeFormat("%m/%d/%y");

    //Read the data
    d3.csv("dataset/time_series_covid19_deaths_global_2nd_quarter.csv",
    
    // When reading the csv, I must format variables:
    function(d){
        return { date : d3.timeParse("%Y-%m-%d")(d.Date), value : d.TotalDeaths }
        //return { date : d3.timeParse("%m/%d/%Y")(d.date), value : d.TotalDeaths }
    },

    // Now I can use this dataset:
    function(error, data) {
        if (error) throw error;
        
        data.forEach(function(d) {
            //d.date = parseDate(d.date);
            d.deaths = +d.value;
        });

        // Add X axis --> it is a date format
        var x = d3.scaleTime()
          .domain(d3.extent(data, function(d) { return d.date; }))
          .range([ 0, width ]);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
          .domain([0, d3.max(data, function(d) { return +d.value; })])
          //.domain([0,700000])
          .range([ height, 0 ]);
        svg.append("g")
          .call(d3.axisLeft(y))
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .attr('fill','black')
          .text("Total number of Deaths");

        // Add the line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "#6F257F")
          .attr("stroke-width", 3)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.value) })
            )
            
        // Add annotation to the chart
        svg.append('text').text('Surge in Covid deaths from April to June.')
            .attr('x',350)
            .attr('y',230)
            .attr('fill','red')
            .attr('font-size',10)
            .attr('font-family','Verdana')
            
        // Adding tooltip
        var focus = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("circle")
            .attr("r", 5);

        var tooltipDate = tooltip.append("div")
            .attr("class", "tooltip-date");

        var tooltipLikes = tooltip.append("div");
        tooltipLikes.append("span")
            .attr("class", "tooltip-title")
            .text("Deaths: ");

        var tooltipLikesValue = tooltipLikes.append("span")
            .attr("class", "tooltip-likes");

        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function() { focus.style("display", null); tooltip.style("display", null);  })
            .on("mouseout", function() { focus.style("display", "none"); tooltip.style("display", "none"); })
            .on("mousemove", mousemove);

        function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            focus.attr("transform", "translate(" + x(d.date) + "," + y(d.deaths) + ")");
            tooltip.attr("style", "left:" + (x(d.date) + 64) + "px;top:" + y(d.deaths) + "px;");
            tooltip.select(".tooltip-date").text(dateFormatter(d.date));
            tooltip.select(".tooltip-likes").text(formatValue(d.deaths));
        }
    })
}

function thirdQuarter() {
    // Clear the area
    d3.select("#my_dataviz").html("");
    
    // Set the title and parameter for this scene
    d3.select("#my_dataviz_title").html("<h2>Line chart showing the total number of global death cases due to Covid for Quarter3(2020).");
    d3.select("#my_dataviz_chart").html("Q3(July-Sepc)");
    
    // set the dimensions and margins of the graph
    //var margin = {top: 10, right: 30, bottom: 30, left: 60},
    //    width = 460 - margin.left - margin.right,
    //    height = 400 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
              
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("display", "none");
    
    var parseDate = d3.timeParse("%Y-%m-%d"),
        bisectDate = d3.bisector(function(d) { return d.date; }).left,
        formatValue = d3.format(","),
        dateFormatter = d3.timeFormat("%m/%d/%y");
              

    //Read the data
    d3.csv("dataset/time_series_covid19_deaths_global_3rd_quarter.csv",
    
    // When reading the csv, I must format variables:
    function(d){
        return { date : d3.timeParse("%Y-%m-%d")(d.Date), value : d.TotalDeaths }
        //return { date : d3.timeParse("%m/%d/%Y")(d.date), value : d.TotalDeaths }
    },

    // Now I can use this dataset:
    function(error, data) {
        if (error) throw error;
        
        data.forEach(function(d) {
            //d.date = parseDate(d.date);
            d.deaths = +d.value;
        });

        // Add X axis --> it is a date format
        var x = d3.scaleTime()
          .domain(d3.extent(data, function(d) { return d.date; }))
          .range([ 0, width ]);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
          .domain([0, d3.max(data, function(d) { return +d.value; })])
          //.domain([0,700000])
          .range([ height, 0 ]);
        svg.append("g")
          .call(d3.axisLeft(y))
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .attr('fill','black')
          .text("Total number of Deaths");

        // Add the line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "#6F257F")
          .attr("stroke-width", 3)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.value) })
            )
            
        // Add annotation to the chart
        svg.append('text').text('Covid deaths Surge continuing in July.')
            .attr('x',400)
            .attr('y',75)
            .attr('fill','red')
            .attr('font-size',10)
            .attr('font-family','Verdana')
            
        // Adding tooltip
        var focus = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("circle")
            .attr("r", 5);

        var tooltipDate = tooltip.append("div")
            .attr("class", "tooltip-date");

        var tooltipLikes = tooltip.append("div");
        tooltipLikes.append("span")
            .attr("class", "tooltip-title")
            .text("Deaths: ");

        var tooltipLikesValue = tooltipLikes.append("span")
            .attr("class", "tooltip-likes");

        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function() { focus.style("display", null); tooltip.style("display", null);  })
            .on("mouseout", function() { focus.style("display", "none"); tooltip.style("display", "none"); })
            .on("mousemove", mousemove);

        function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            focus.attr("transform", "translate(" + x(d.date) + "," + y(d.deaths) + ")");
            tooltip.attr("style", "left:" + (x(d.date) + 64) + "px;top:" + y(d.deaths) + "px;");
            tooltip.select(".tooltip-date").text(dateFormatter(d.date));
            tooltip.select(".tooltip-likes").text(formatValue(d.deaths));
        }
    })
}