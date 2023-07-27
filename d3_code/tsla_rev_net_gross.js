function main() {
    console.log("rev net gross stats connected")

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    var xScale = d3.scaleBand().range([0,width]).padding(0.2);
    var yScale = d3.scaleLinear().range([height,0]);

    var svg = d3.select("#graph3").append("svg")
            .attr("width", width+margin.left+margin.right)
            .attr("height", height+margin.top+margin.bottom)
            .append("g")
            .attr("transform","translate("+margin.left+","+margin.top+")");

        svg.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "lightgrey")
            .attr("transform","translate(-50,-25)");

    tooltip = d3.select("#scene3")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", d3.hsl(0, 0.4, 0.4, 0.8))
        .style("border-radius", "3px")
        .style("padding", "15")
        .style("color", "white")
        .style("width", "275px")
        .style("height", "20px")

    d3.csv("./data/tsla_annual_rev.csv").then(function(data) {

            xScale.domain(d3.map(data, function(d) { return d.year; }));
            yScale.domain([-d3.max(data, function(d) { return +d.million_usd_rev; }), d3.max(data, function(d) { return +d.million_usd_rev; })]);
    
            var pos_color = d3.hsl(240, 0.8, 0.6, 1),
                neg_color = d3.hsl(0, 0.85, 0.65, 1);
            
            var graph_rect = svg.append("rect")
                .attr("width", width)
                .attr("height", height)
                .attr("fill", "white");
    
            svg.append("g")
                .attr("fill", pos_color)
                .selectAll("rect")
                .data(data.map(d => d.million_usd_rev > 0 ? d : {million_usd_rev: 0}))
                .join("rect")
                .attr("x", function(d) { return xScale(d.year); })
                .attr("y", d => yScale(d.million_usd_rev))
                .attr("height", d => yScale(0) - yScale(d.million_usd_rev))
                .attr("width", xScale.bandwidth())
                .on("mouseover", function (event, d) {
                    d3.select(this).transition()
                         .duration('50')
                         .attr('opacity', '.8')
                        
                         tooltip.transition()
                         .duration('50')
                         .style("opacity", 1);
                         console.log(d.million_usd_rev)
                         let yearlog = "Year: " + d.year + "\n" + "Annual Revenue: " + d.million_usd_rev  + " Million USD";
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
                .attr("transform", "translate(0," + height/2 + ")")
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
                .text("Revenue (Million $)");
    
        });

    var svg_net = d3.select("#graph4").append("svg")
            .attr("width", width+margin.left+margin.right)
            .attr("height", height+margin.top+margin.bottom)
            .append("g")
            .attr("transform","translate("+margin.left+","+margin.top+")");

            svg_net.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "lightgrey")
            .attr("transform","translate(-50,-25)");

    tooltip_net = d3.select("#scene4")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", d3.hsl(0, 0.4, 0.4, 0.8))
        .style("border-radius", "3px")
        .style("padding", "15")
        .style("color", "white")
        .style("width", "295px")
        .style("height", "20px")

    d3.csv("./data/tsla_annual_net_income.csv").then(function(data) {

        xScale.domain(d3.map(data, function(d) { return d.year; }));
        yScale.domain([-d3.max(data, function(d) { return +d.millions_usd_ni; }), d3.max(data, function(d) { return +d.millions_usd_ni; })]);

        var pos_color = d3.hsl(240, 0.8, 0.6, 1),
            neg_color = d3.hsl(0, 0.85, 0.65, 1);
        
        var graph_rect = svg_net.append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("fill", "white")

            svg_net.append("g")
            .attr("fill", pos_color)
            .selectAll("rect")
            .data(data.map(d => d.millions_usd_ni > 0 ? d : {millions_usd_ni: 0}))
            .join("rect")
            .attr("x", function(d) { return xScale(d.year); })
            .attr("y", d => yScale(d.millions_usd_ni))
            .attr("height", d => yScale(0) - yScale(d.millions_usd_ni))
            .attr("width", xScale.bandwidth())
            .on("mouseover", function (event, d) {
                d3.select(this).transition()
                     .duration('50')
                     .attr('opacity', '.8')
                    
                     tooltip_net.transition()
                     .duration('50')
                     .style("opacity", 1);
                     console.log(d.millions_usd_ni)
                     let yearlog = "Year: " + d.year + "\n" + "Annual Net Income: " + d.millions_usd_ni + " Million USD";
                     tooltip_net.html(yearlog)
                        .style("left", (d.pageX) + "px")
                        .style("top", (d.pageY-100) + "px");
                    })
            .on('mouseout', function (event, d) {
                d3.select(this).transition()
                     .duration('50')
                     .attr('opacity', '1')
                     
                     tooltip_net.transition()
                     .duration('50')
                     .style("opacity", 0);
                    });
  
        svg_net.append("g")
            .attr("fill", neg_color)
            .selectAll("rect")
            .data(data.map(d => d.millions_usd_ni < 0 ? d : {millions_usd_ni: 0}))
            .join("rect")
            .attr("x", function(d) { return xScale(d.year); })
            .attr("y", d => yScale(0))
            .attr("height", d => yScale(0) - yScale(-d.millions_usd_ni))
            .attr("width", xScale.bandwidth())
            .on("mouseover", function (event, d) {
                d3.select(this).transition()
                     .duration('50')
                     .attr('opacity', '.8')
                    
                     tooltip_net.transition()
                     .duration('50')
                     .style("opacity", 1);
                     console.log(d.millions_usd_ni)
                     let yearlog = "Year: " + d.year + "\n" + "Annual Net Income: " + d.millions_usd_ni + " Million USD";
                     tooltip_net.html(yearlog)
                        .style("left", (d.pageX) + "px")
                        .style("top", (d.pageY) + "px");
                    })
            .on('mouseout', function (event, d) {
                d3.select(this).transition()
                     .duration('50')
                     .attr('opacity', '1')
                     
                     tooltip_net.transition()
                     .duration('50')
                     .style("opacity", 0);
                    });

        svg_net.append("g")
            .attr("transform", "translate(0," + height/2 + ")")
            .call(d3.axisBottom(xScale));

        svg_net.append("g")
            .call(d3.axisLeft(yScale));
        
        svg_net.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width - 7)
            .attr("y", height/2 + 30)
            .text("Year");
        
        svg_net.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", -10)
            .attr("y", 7)
            .attr("dy", "1em")
            .attr("transform", "rotate(-90)")
            .text("Net Income (Million $)");

    });

    var svg_gross = d3.select("#graph5").append("svg")
            .attr("width", width+margin.left+margin.right)
            .attr("height", height+margin.top+margin.bottom)
            .append("g")
            .attr("transform","translate("+margin.left+","+margin.top+")");

            svg_gross.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "lightgrey")
            .attr("transform","translate(-50,-25)");

    tooltip_gross = d3.select("#scene5")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", d3.hsl(0, 0.4, 0.4, 0.8))
        .style("border-radius", "3px")
        .style("padding", "15")
        .style("color", "white")
        .style("width", "295px")
        .style("height", "20px")

    d3.csv("./data/tsla_annual_gross_profit.csv").then(function(data) {

        xScale.domain(d3.map(data, function(d) { return d.year; }));
        yScale.domain([-d3.max(data, function(d) { return +d.million_usd_gp; }), d3.max(data, function(d) { return +d.million_usd_gp; })]);

        var pos_color = d3.hsl(240, 0.8, 0.6, 1),
            neg_color = d3.hsl(0, 0.85, 0.65, 1);

        var graph_rect = svg_gross.append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("fill", "white")

            svg_gross.append("g")
            .attr("fill", pos_color)
            .selectAll("rect")
            .data(data.map(d => d.million_usd_gp > 0 ? d : {million_usd_gp: 0}))
            .join("rect")
            .attr("x", function(d) { return xScale(d.year); })
            .attr("y", d => yScale(d.million_usd_gp))
            .attr("height", d => yScale(0) - yScale(d.million_usd_gp))
            .attr("width", xScale.bandwidth())
            .on("mouseover", function (event, d) {
                d3.select(this).transition()
                     .duration('50')
                     .attr('opacity', '.8')
                    
                     tooltip_gross.transition()
                     .duration('50')
                     .style("opacity", 1);
                     console.log(d.million_usd_gp)
                     let yearlog = "Year: " + d.year + "\n" + "Annual Gross Profit: " + d.million_usd_gp + " Million USD";
                     tooltip_gross.html(yearlog)
                        .style("left", (d.pageX) + "px")
                        .style("top", (d.pageY) + "px");
                    })
            .on('mouseout', function (event, d) {
                d3.select(this).transition()
                     .duration('50')
                     .attr('opacity', '1')
                     
                     tooltip_gross.transition()
                     .duration('50')
                     .style("opacity", 0);
                    });

        svg_gross.append("g")
            .attr("transform", "translate(0,"+height/2+")")
            .call(d3.axisBottom(xScale));

        svg_gross.append("g")
            .call(d3.axisLeft(yScale));
        
        svg_gross.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width - 7)
            .attr("y", height/2 + 30)
            .text("Year");
        
        svg_gross.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", -10)
            .attr("y", 7)
            .attr("dy", "1em")
            .attr("transform", "rotate(-90)")
            .text("Gross Profit (Million $)");

    });

}