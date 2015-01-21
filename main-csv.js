var diameter = 500,
  format = d3.format(",d"),
  color = d3.scale.category20c();

var pack = d3.layout.pack()
  .size([diameter, diameter])
  .padding(5)
  .value(function(d) { return d.percentage; });

var vis = d3.select("#embed").append("svg")
  .attr("width", diameter)
  .attr("height", diameter)
  .attr("class", "pack")
  .append("g");


d3.csv("data/country-data-test.csv", function(error, csvData) {

  if (error) {

        console.log(error);

  } else {

    var data = { name: "parent", children: csvData };

    var node = vis.data([data]).selectAll("circle")
      .data(pack.nodes)
      .enter().append("circle")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return color(d.question); });

    node.append("title")
      .text(function(d) { return d.country + ": " + format(d.percentage); });

  }

  console.log(data);

});
