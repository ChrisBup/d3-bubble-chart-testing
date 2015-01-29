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

//  try {
//    computeError();
//  } catch (e) {
//    console.log(e);
//    return
//  }

  console.log(csvData);

  if (error) {

        console.log(error);
        // return error;
        // throw error;

  } else {

    // Parse the CSV file
    var csvRows = [];
    csvData.forEach(function(row) {
      csvRows.push({
        country: row.country,
        percentage: +row.percentage // parseInt(row.percentage, 10)
        // date: new Date(row.date)
      });
    });

    var data = { name: "parent", children: csvRows };
//  var data = { name: "parent", children: csvData };

    console.log(data);

    // {
    //   name: 'parent',
    //   children: [
    //    {country: 'Chile', percentage: '100'},
    //    {country: 'Brazil', percentage: '200'}
    //   ]
    //}
    //
    // children: [
    //  {Chile: 100},
    //  {Brazil: 200}
    // ]

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
