var gross_profit = [
    {year: "2010", stat: 31},
    {year: "2011", stat: 62},
    {year: "2012", stat: 30}, 
    {year: "2013", stat: 456},
    {year: "2014", stat: 882},
    {year: "2015", stat: 924},
    {year: "2016", stat: 1599},
    {year: "2017", stat: 2223},
    {year: "2018", stat: 4042},
    {year: "2019", stat: 4069},
    {year: "2020", stat: 6630},
    {year: "2021", stat: 13606},
    {year: "2022", stat: 20853}
 ];

 var revenue = [
    {year: "2010", stat: 117},
    {year: "2011", stat: 204},
    {year: "2012", stat: 413}, 
    {year: "2013", stat: 2013},
    {year: "2014", stat: 3198},
    {year: "2015", stat: 4046},
    {year: "2016", stat: 7000},
    {year: "2017", stat: 11759},
    {year: "2018", stat: 21461},
    {year: "2019", stat: 24578},
    {year: "2020", stat: 31536},
    {year: "2021", stat: 53823},
    {year: "2022", stat: 81462}
 ];
function main(data) {
    d3.selectAll("rect").remove()
    d3.select("g").remove()
    d3.select("svg").remove()

    var margin = {top: 15, right: 15, bottom: 20, left: 40},
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var svg = d3.select("#graph3").append("svg")
            .attr("width", width+margin.left+margin.right)
            .attr("height", height+margin.top+margin.bottom)
            .append("g")
            .attr("transform","translate("+margin.left+","+margin.top+")");

    var xScale = d3.scaleBand()
                .range([0, width])
                .domain(d3.map(gross_profit, function(d) { return d.year; }))
                .padding(0.2);
            
    svg.append("g")
        .attr("transform", "translate(0,"+height+")")
        .call(d3.axisBottom(xScale))

    var yScale = d3.scaleLinear()
        .domain([0, 81462])
        .range([height, 0]);
    
    svg.append("g") 
        .call(d3.axisLeft(yScale));

        svg.selectAll("rect").data(data)
            .join("rect")
            .transition()
            .duration(700)
            .attr("x", function(d) {return xScale(d.year);} )
            .attr("y", function(d) {return yScale(d.stat);})
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) {return height - yScale(d.stat);})
            .attr("fill", d3.hsl(240, 0.8, 0.6, 1))
}