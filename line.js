function main() {

        // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    // set the ranges
    var xScale = d3.scaleTime().range([0, width]);
    var yScale = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
    .x(function(d) { return xScale(d.date); })
    .y(function(d) { return yScale(d.Close); });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    //d3.csv("data.csv").then(function(data) {
    d3.csv("TSLA.csv").then(function(data) {

    var parseDate = d3.timeParse("%Y-%m-%d");
    data.forEach(function(d) {
        d.date = parseDate(d.Date);
        d.Close = +d.Close;
    });

    // Scale the range of the data
    xScale.domain(d3.extent(data, function(d) { return d.date; }));
    yScale.domain([0, d3.max(data, function(d) { return d.Close; })]);

    // Add the valueline path.
    svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", valueline);

    // Add the x Axis
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

    // Add the y Axis
    svg.append("g")
    .call(d3.axisLeft(yScale));

    });

}