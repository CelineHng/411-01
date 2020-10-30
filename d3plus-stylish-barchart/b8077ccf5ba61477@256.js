// https://observablehq.com/@anatolyg/d3plus-stylish-barchart@256
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# D3Plus Stylish barchart`
)});
  main.variable(observer("data")).define("data", function(){return(
[
  {id: "host 1", x: "99212", y:  7},
  {id: "host 1", x: "99213", y: 25},
  {id: "host 1", x: "99214", y: 13},
    {id: "host 1", x: "99215", y: 33},
  {id: "host 2",  x: "99212", y: 17},
  {id: "host 2",  x: "99213", y:  8},
  {id: "host 2",  x: "99214", y: 13},
    {id: "host 2",  x: "99215", y: 10},
  {id: "host 3",  x: "99212", y: 27},
  {id: "host 3",  x: "99213", y:  18},
  {id: "host 3",  x: "99214", y: 5},
    {id: "host 3",  x: "99215", y: 25},
  {id: "host 4",  x: "99212", y: 21},
  {id: "host 4",  x: "99213", y:  33},
  {id: "host 4",  x: "99214", y: 20},  
    {id: "host 4",  x: "99215", y: 12},  
]
)});
  main.variable(observer("i")).define("i", ["data"], function(data){return(
(data.length/4) * (30*3 + 10) + 100
)});
  main.variable(observer("colors")).define("colors", function(){return(
[
'#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabebe', '#469990', '#e6beff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9'
]
)});
  main.variable(observer("data_colors")).define("data_colors", ["_","data","colors"], function(_,data,colors){return(
_.chain(data).groupBy('id').keys().reduce((memo, name, i) => {
  memo[name] = colors[i];
  return memo;
}, {}).value()
)});
  main.variable(observer()).define(["html","i"], function(html,i){return(
html`<svg id="chart" width="720" height="${i}"></svg>`
)});
  main.variable(observer("chart")).define("chart", ["d3","d3plus","data","data_colors"], function(d3,d3plus,data,data_colors){return(
new Promise(resolve => {
  d3.select("#chart").selectAll("*").remove()  
  new d3plus.BarChart()
    .select("#chart")
    .data(data)
    .barPadding(2)
    .groupPadding(20)

    .xConfig({
      barConfig:   {stroke: "black" },
      gridConfig:  {stroke: "transparent"},
    })
    .yConfig({
      gridConfig:  {stroke: "transparent"},
      barConfig:   {stroke: "transparent"},
      shapeConfig: {stroke: "black"}
    })
    .shapeConfig({
      labelConfig: {
        fontFamily: "sans-serif",
        fontMax: 100
      },
      fill: function(d, i) {
        return data_colors[d.id];
      },
      Bar: {
        strokeWidth: 0,
        width: 35
      },
    })  
    .render( () => {
    return resolve(d3.select("#chart").node());
  })    
})
)});
  main.variable(observer("d3plus")).define("d3plus", ["require"], function(require){return(
require("https://d3plus.org/js/d3plus.v2.0.0-alpha.16.full.min.js")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  main.variable(observer("_")).define("_", ["require"], function(require){return(
require('lodash')
)});
  return main;
}
