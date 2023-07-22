function main() {
    var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin
    height = svg.attr("height") - margin;

    // Title

    svg.append("text")
        .attr("transform", "translate(100,0)")
        .attr("x", 70)
        .attr("y", 50)
        .attr("font-size", "24px")
        .text("Tesla Stock Prices");

    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);
    
    var g = svg.append("g").attr("transform", "translate("+100+","+100+")")

    // d3.csv("/stock_values.csv").then(function(data) {
        
    //     xScale.domain(data.map(function(d){ return d.year;}));
    //     yScale.domain([0, d3.max(data, function(d) {return d.value;})]);

    //     g.append("g")
    //         .attr("transform", "translate(0,"+height+")")
    //         .call(d3.axisBottom(xScale))

    //     g.append("g")
    //         .call(d3.axisLeft(yScale).tickFormat( function(d) {
    //         return "$" + d;
    //     }).ticks(10));

    // g.selectAll(".bar")
    //     .data(data)
    //     .enter().append("rect")
    //     .attr("class", "bar")
    //     .attr("x", function(d) {return xScale(d.year);})
    //     .attr("y", function(d) {return yScale(d.value);})
    //     .attr("width", xScale.bandwidth())
    //     .attr("height", function(d) {return height - yScale(d.value);});

    // });
    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

    // When reading the csv, I must format variables:
    function(d){
        return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
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
      .domain([0, d3.max(data, function(d) { return +d.value; })])
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