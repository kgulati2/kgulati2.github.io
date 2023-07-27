function main() {

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var xScale = d3.scaleTime().range([0,width]);
    var yScale = d3.scaleLinear().range([height,0]);

    var valueline = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale(d.Close); });

    var svg = d3.select("#graph1").append("svg")
            .attr("width", width+margin.left+margin.right)
            .attr("height", height+margin.top+margin.bottom)
            .append("g")
            .attr("transform","translate("+margin.left+","+margin.top+")");

        svg.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "lightgrey")
            .attr("transform","translate(-50,-25)");
    
    tooltip = d3.select("#scene1")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", d3.hsl(0, 0.4, 0.4, 0.8))
        .style("border-radius", "3px")
        .style("padding", "15")
        .style("color", "white")
        .style("width", "180px")
        .style("height", "20px")
    
    d3.csv("./data/TSLA.csv", function(d) { return { date: d.Date, Close: d.Close}}).then(function(data) {

        var parseDate = d3.timeParse("%Y-%m-%d");

        data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.Close = +d.Close;
        });

        xScale.domain(d3.extent(data, function(d) { return d.date; })).range([0, width]);
        yScale.domain([0, d3.max(data, function(d) { return d.Close; })]).range([height, 0]);

        var list_rect = svg.append("rect")
                        .attr("width", width)
                        .attr("height", height)
                        .attr("fill", "white");

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueline);

        var circle = svg.append("circle")
                        .attr("r", 0)
                        .attr("fill", "white")
                        .attr("stroke", "steelblue")
                        .attr("opacity", 0.7)
                        .style("pointer-events", "none");

        console.log(data)
        const formatDate = d3.timeFormat("%b-%Y");
        const formatStock = d3.format("0.2s")
        list_rect.data(data).on("mousemove", function(event, d) {

            const xPoint = d3.pointer(event, this)[0];
            //console.log(xPoint)
            const bisect = d3.bisector(function(d) { return d.date; }).left;
            //console.log(bisect)
            const x0 = xScale.invert(xPoint);
            //console.log(x0)
            const i = bisect(data, x0, 1);
            //console.log(i)
            const d0 = data[i-1];
            //console.log(d0)
            const d1 = data[i];
            const d_loc = x0 - d0 > d1 - x0 ? d1 : d0;

            const xpos = xScale(d_loc.date);
            const ypos = yScale(d_loc.Close);


            d3.select(this).transition()
                            .duration('50')
                            .attr('opacity', '.8')
                        
                            tooltip.transition()
                            .duration('50')
                            .style("opacity", 1);
                            console.log(d_loc.Close)
                            let yearlog = "Date: " + formatDate(d_loc.date) + "\n" + "Stock: $ " + formatStock(d_loc.Close);
                            tooltip.html(yearlog)
                            .style("left", (d.pageX) + "px")
                            .style("top", (d.pageY) + "px");
            
            circle.attr("cx", xpos)
            .attr("cy", ypos)

            console.log(xpos)

            circle.transition()
                .duration(50)
                .attr("r", 5);
        })

        list_rect.on("mouseleave", function () {
            d3.select(this).transition()
                            .duration('50')
                            .attr('opacity', '1')
                            
                            tooltip.transition()
                            .duration('50')
                            .style("opacity", 0);
            circle.transition()
              .duration(50)
              .attr("r", 0);
        
          });
        svg.selectAll("dot")
                .data(data)
                .enter().append("circle")
                .attr("r", 1.5)
                .attr("fill", "red")
                .attr("cx", function(d) { return xScale(d.date); })
                .attr("cy", function(d) { return yScale(d.Close); });

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));

        svg.append("g")
            .call(d3.axisLeft(yScale));

        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width - 7)
            .attr("y", height - 7)
            .text("Year");
        
        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", -10)
            .attr("y", 7)
            .attr("dy", "1em")
            .attr("transform", "rotate(-90)")
            .text("Closing Price ($)");

    });

}