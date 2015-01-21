(function() {

  var diameter = 500;

  var svg = d3.select("#embed").append("svg")
    .attr("width", diameter)
    .attr("height", diameter);

  var bubble = d3.layout.pack()
    .size([diameter, diameter])
    .value(function(d) {return d.size;})
    .padding(5);

    d3.csv("data/country-data.csv", function(error, data) {

      if (error) {

        console.log(error);

      } else {

        var nodes = bubble.nodes(processData(data))
          .filter(function(d) { return !d.children; });

        var vis = svg.selectAll('circle')
          .data(nodes);

        vis.enter().append('circle')
          .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
          .attr('r', function(d) { return d.r; })
          .attr('class', function(d) { return d.className; });

        var nameLabel = vis.enter().append("text")
          .html(function(d) {
            return d.name;
          })
          .attr("text-anchor", "middle")
          .attr("x", function(d) { return d.x; })
          .attr("y", function(d) { return d.y; })
          .attr("font-family", "sans-serif")
          .attr("font-size", "12px")
          .attr("fill", "white");

        var valueLabel = vis.enter().append("text")
          .html(function(d) {
            return d.value;
          })
          .attr("text-anchor", "middle")
          .attr("x", function(d) { return d.x; })
          .attr("y", function(d) { return d.y; })
          .attr("dx", 0)
          .attr("dy", 14)
          .attr("font-family", "sans-serif")
          .attr("font-size", "12px")
          .attr("fill", "white");

        function processData(data) {
          var obj = data;

          var newDataSet = [];

          for(var prop in obj) {
            newDataSet.push({name: prop, className: prop.toLowerCase(), size: obj[prop]});
          }
          return {children: newDataSet};
        }

      }

    });

})();
