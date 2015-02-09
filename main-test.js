console.log("--------- start at", new Date().toLocaleTimeString(),"---------")

d3.select(".vis-title").text("D3 Static Data Bubble Chart");

var diameter = 500,
  format = d3.format(",d"),
  color = d3.scale.category20c();

var pack = d3.layout.pack()
  .size([diameter, diameter])
  .sort(null)
  .padding(5)
  .value(function(d) {
    console.log("getting node value for", d.country, "of", d.percentage);
    return d.percentage;
  });

var vis = d3.selectAll("#embed").append("svg")
  .attr("width", diameter)
  .attr("height", diameter)
  .attr("class", "pack")
  .append("g");

d3.csv("data/country-data-test.csv", null, function(error, csvData) {

  console.log("csvData:", JSON.stringify(csvData));

  if (error) {
    console.log("ERROR:", error);
  } else {

    // Parse the CSV file
    var csvRows = [];
    csvData.forEach(function(row) {
      csvRows.push({
        question: +row.question,  // JSE ADDED
        country: row.country,
        percentage: +row.percentage, // parseInt(row.percentage, 10)
        color: row.color
        // date: new Date(row.date)
      });
    });

    var data = { name: "parent", children: csvRows };

    console.log("data:", JSON.stringify(data));

    console.log("pack.nodes", pack.nodes);
    console.log("pack.nodes(data)", pack.nodes(data));

    var packedNodes = pack.nodes(data); // .slice(1);
    // debugger;
    console.log("packedNodes", packedNodes);

    var node = vis.selectAll("circle")
      .data(packedNodes)
      .enter().append("circle")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d, i) {
        //return color(d.depth);
        return i ? d.color : "#ff0000";
        // return color(d.question);
      })
      .style("fill-opacity", function(d,i){
        return i ? 1.0 : 0.0;
      });

    var fruitSister = d3.scale.category10();

    var text = vis.selectAll("text")
      .data(packedNodes)
      .enter().append("text")
      .attr("fill", function(d) {
        return d3.rgb(fruitSister(d.question)).brighter(1.4);
        //console.log("color(d.question):", color(d.question),"d3.rgb(color(d.question)):", d3.rgb(color(d.question)));
        return d3.rgb(color(d.question)).darker(2.5);
      })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .attr('text-anchor', 'middle')
      .text(function(d){ return d.country; });

    text
      .append("tspan")
      .text(function(d,i){
        return "// " + d.percentage;
      })
      .attr("x", 0)
      .attr("dy", 27)
      .style("fill-opacity", function(d,i){
        return i ? 1.0 : 0.0;
      });

    node.append("title")
      .text(function(d) { return d.country + ": " + format(d.percentage); });
  }

});
