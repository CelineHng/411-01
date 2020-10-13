document.addEventListener('DOMContentLoaded', () => {
  var render = (selector, size, data) => {
    var margin = size.margin;
    var width = size.width - margin.left - margin.right;
    var height = size.height - margin.top - margin.bottom;
    
    var x = d3.scaleBand()
      .domain(data.map(d => d.x))
      .rangeRound([0, width])
      .padding(0.1);
      
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y)])
      .range([height, 0]);

    var xAxis = d3.axisBottom(x);
    
    var yAxis = d3.axisLeft(y)
      .ticks(10);
    
    var svg = d3.select(selector)
      .attr('width', size.width)
      .attr('height', size.height)
      
    var chart = svg.append('g')
        .attr('transform', `translate(${ margin.left }, ${ margin.top })`);

    colors = ['DodgerBlue', 'MediumSeaGreen', 'Orange', 'Tomato'];

    chart.append('g')
      .attr('transform', `translate(0, ${ height })`)
      .attr('class', 'axis x')
      .call(xAxis);
      
    chart.append('g')
      .attr('class', 'axis y')
      .call(yAxis);
    
    chart.append("text")
          .attr("transform", "translate(100,0)")
          .attr("x", 80)
          .attr("y", 1)
          .attr("font-size", "20px")
          .attr("class", "title")
          .text("DATA")


    chart.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.x))
        .attr('width', x.bandwidth())
        .attr('y', d => y(d.y))
        .attr('height', d => height - y(d.y))
        .attr('fill', function (d, i) { return colors[i] })

  }
  fetch('data.json')
    .then(data => data.json())
    .then(data => {
      var settings = {
        width: 500,
        height: 300,
        margin: {
          top: 20,
          right: 20,
          bottom: 30,
          left: 40
        }
      };
      
      render('#chart', settings, data);
  });

});
