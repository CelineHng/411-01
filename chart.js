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
    
    var svg1 = d3.select(selector)
      .attr('width', size.width)
      .attr('height', size.height)
      
    var chart2 = svg1.append('g')
        .attr('transform', `translate(${ margin.left }, ${ margin.top })`);

    colors = ['DodgerBlue', 'MediumSeaGreen', 'Orange', 'Tomato'];

    chart1.append('g')
      .attr('transform', `translate(0, ${ height })`)
      .attr('class', 'axis x')
      .call(xAxis);
      
    chart1.append('g')
      .attr('class', 'axis y')
      .call(yAxis);
    
    chart1.append("text")
          .attr("transform", "translate(100,0)")
          .attr("x", 80)
          .attr("y", 1)
          .attr("font-size", "20px")
          .attr("class", "title")
          .text("DATA")


    chart1.selectAll('.bar')
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

  var rend = (selector, size, data) => {
    var margin = size.margin;
    var width = size.width - margin.left - margin.right;
    var height = size.height - margin.top - margin.bottom;
    
    var n = d3.scaleBand()
      .domain(data.map(d => d.n))
      .rangeRound([0, width])
      .padding(0.1);
      
    var m = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.m)])
      .range([height, 0]);

    var nAxis = d3.axisBottom(n);
    
    var mAxis = d3.axisLeft(m)
      .ticks(10);
    
    var svg2 = d3.select(selector)
      .attr('width', size.width)
      .attr('height', size.height)
      
    var chart2 = svg2.append('g')
        .attr('transform', `translate(${ margin.left }, ${ margin.top })`);

    colors = ['DodgerBlue', 'MediumSeaGreen', 'Orange', 'Tomato'];

    chart2.append('g')
      .attr('transform', `translate(0, ${ height })`)
      .attr('class', 'axis n')
      .call(nAxis);
      
    chart2.append('g')
      .attr('class', 'axis m')
      .call(mAxis);
    
    chart2.append("text")
          .attr("transform", "translate(100,0)")
          .attr("n", 80)
          .attr("m", 1)
          .attr("font-size", "20px")
          .attr("class", "title")
          .text("DATA")


    chart2.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('n', d => n(d.n))
        .attr('width', n.bandwidth())
        .attr('m', d => m(d.m))
        .attr('height', d => height - m(d.m))
        .attr('fill', function (d, i) { return colors[i] })

  }
  
  fetch('data.json')
    .then(data => data.json())
    .then(data => {
      var set = {
        width: 500,
        height: 300,
        margin: {
          top: 20,
          right: 20,
          bottom: 30,
          left: 40
        }
      };
      
      rend('#chart', settings, data);
    });

    
});
