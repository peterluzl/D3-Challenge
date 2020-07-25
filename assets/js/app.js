// @TODO: YOUR CODE HERE!
const init = () => {
  d3.csv('assets/data/data.csv').then((data) => {
    console.log(data)
    const res = data.map(e => {
      return {
        poverty: e.poverty,
        healthcare: e.healthcare,
        state: e.state,
        abbr: e.abbr
      }
    })
    drawSvg(res)
  })
}

const drawSvg = (res) => {
  const w = 900;
  const h = 600;
  const padding = 60

  const dataset = res.map(e => [+e.healthcare, +e.poverty, e.abbr])

  const svg = d3.select('#scatter')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

  svg.append('text')
    .attr('x', w / 2 - 120)
    .attr('y', 30)
    .attr('class', 'title')
    .text('d3 scatter')

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, (d) => d[0])])
    .range([padding, w - padding * 2])

    const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, (d) => d[1])])
    .range([h - padding, padding])

  svg.selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('cx', (d) => {
      return xScale(d[0])
    })
    .attr('cy', (d) => {
      return yScale(d[1])
    })
    .attr('r', (d) => {
      return 10
    })
    .attr('fill', '#7BC0D7')

    svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text(function (d) {
      return d[2];
    })
    .attr('x', function (d) {
      return xScale(d[0]) - 7
    })
    .attr('y', function (d) {
      return yScale(d[1]) + 4
    })
    .attr('font-family', 'sans-serif')
    .attr('font-size', '10px')
    .attr('fill', 'white');

  const xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(7)

  const yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(7)

  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,' + (h - padding) + ')')
    .call(xAxis)
    .append('text')
    .text(`In Poverty (%)`)
    .attr('x', 400)
    .attr('y', 40)
    .style('fill', '#666')
    .style('font-size', 20)
    .style('font-weight', 'bold')

  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(' + padding + ',0)')
    .call(yAxis)
    .append('text')
    .text(`Lacks Healthcare (%)`)
    .attr('x', -200)
    .attr('y', -40)
    .style('fill', '#666')
    .style('font-size', 20)
    .style('font-weight', 'bold')
    .style('transform', 'rotate(270deg)')
}

init()