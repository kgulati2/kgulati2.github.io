function main() {
    console.log("eps connected")

    var margin = {top: 15, right: 15, bottom: 20, left: 40},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var xScale = d3.scaleBand().range([0,width]).padding(0.2);
    var yScale = d3.scaleLinear().range([height,0]);

    var svg = d3.select("#graph2").append("svg")
            .attr("width", width+margin.left+margin.right)
            .attr("height", height+margin.top+margin.bottom)
            .append("g")
            .attr("transform","translate("+margin.left+","+margin.top+")");
        
        svg.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "lightgrey")
            .attr("transform","translate(-50,-25)");

    tooltip = d3.select("#scene2")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", d3.hsl(0, 0.4, 0.4, 0.8))
        .style("border-radius", "3px")
        .style("padding", "15")
        .style("color", "white")
        .style("width", "255px")
        .style("height", "20px")

    d3.csv("./data/tsla_annual_eps.csv").then(function(data) {

        xScale.domain(d3.map(data, function(d) { return d.year; }));
        yScale.domain([-d3.max(data, function(d) { return d.eps; }), d3.max(data, function(d) { return d.eps; })]);

        var pos_color = d3.hsl(240, 0.8, 0.6, 1),
            neg_color = d3.hsl(0, 0.85, 0.65, 1);
        
        var graph_rect = svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("fill", "white");
            
        svg.append("g")
            .attr("fill", pos_color)
            .selectAll("rect")
            .data(data.map(d => d.eps > 0 ? d : {eps: 0}))
            .join("rect")
            .attr("x", function(d) { return xScale(d.year); })
            .attr("y", d => yScale(d.eps))
            .attr("height", d => yScale(0) - yScale(d.eps))
            .attr("width", xScale.bandwidth())
            .on("mouseover", function (event, d) {
                d3.select(this).transition()
                     .duration('50')
                     .attr('opacity', '.8')
                    
                     tooltip.transition()
                     .duration('50')
                     .style("opacity", 1);
                     console.log(d.eps)
                     let yearlog = "Year: " + d.year + "\n" + "Earnings Per Share (EPS): " + d.eps + " $";
                     tooltip.html(yearlog)
                        .style("left", (d.pageX) + "px")
                        .style("top", (d.pageY) + "px");
                    })
            .on('mouseout', function (event, d) {
                d3.select(this).transition()
                     .duration('50')
                     .attr('opacity', '1')
                     
                     tooltip.transition()
                     .duration('50')
                     .style("opacity", 0);
                    });

        svg.append("g")
            .attr("fill", neg_color)
            .selectAll("rect")
            .data(data.map(d => d.eps < 0 ? d : {eps: 0}))
            .join("rect")
            .attr("x", function(d) { return xScale(d.year); })
            .attr("y", d => yScale(0))
            .attr("height", d => yScale(0) - yScale(-d.eps))
            .attr("width", xScale.bandwidth())
            .on("mouseover", function (event, d) {
                d3.select(this).transition()
                     .duration('50')
                     .attr('opacity', '.8')
                    
                     tooltip.transition()
                     .duration('50')
                     .style("opacity", 1);
                     console.log(d.eps)
                     let value = "Year: " + d.year + "\n" + "Earnings Per Share (EPS): " + d.eps + " $";
                     tooltip.html(value)
                        .style("left", (d.pageX) + "px")
                        .style("top", (d.pageY) + "px");
                    })
            .on('mouseout', function (event, d) {
                d3.select(this).transition()
                     .duration('50')
                     .attr('opacity', '1')
                     
                     tooltip.transition()
                     .duration('50')
                     .style("opacity", 0);
                    });

    
        svg.append("g")
            .attr("transform", "translate(0,"+height/2+")")
            .call(d3.axisBottom(xScale));

        svg.append("g")
            .call(d3.axisLeft(yScale));

        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width - 7)
            .attr("y", height/2 + 30)
            .text("Year");
        
        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", -10)
            .attr("y", 7)
            .attr("dy", "1em")
            .attr("transform", "rotate(-90)")
            .text("Earnings Per Share ($)");
    });
}