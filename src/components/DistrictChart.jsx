import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { districtSeatCounts } from '../data/constituencies';

const W = 420, H = 320, ML = 140, MR = 40, MT = 16, MB = 24;
const INNER_W = W - ML - MR;
const INNER_H = H - MT - MB;

export default function DistrictChart({ selected, onSelect }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg
      .append('g')
      .attr('transform', `translate(${ML},${MT})`);

    const x = d3.scaleLinear()
      .domain([0, d3.max(districtSeatCounts, (d) => d.count) + 1])
      .range([0, INNER_W]);

    const y = d3.scaleBand()
      .domain(districtSeatCounts.map((d) => d.district))
      .range([0, INNER_H])
      .padding(0.25);

    // Gridlines
    g.append('g')
      .attr('class', 'grid')
      .call(
        d3.axisBottom(x)
          .ticks(5)
          .tickSize(INNER_H)
          .tickFormat(''),
      )
      .call((gg) => {
        gg.select('.domain').remove();
        gg.selectAll('line').attr('stroke', '#e0e0e0');
      });

    // Bars
    g.selectAll('.bar')
      .data(districtSeatCounts)
      .join('rect')
      .attr('class', 'bar')
      .attr('y', (d) => y(d.district))
      .attr('height', y.bandwidth())
      .attr('x', 0)
      .attr('width', (d) => x(d.count))
      .attr('rx', 3)
      .attr('fill', (d) => (selected === d.district ? '#1565c0' : '#5e81c0'))
      .attr('cursor', 'pointer')
      .on('click', (_, d) => onSelect(selected === d.district ? null : d.district))
      .on('mouseenter', function (_, d) {
        if (selected !== d.district)
          d3.select(this).attr('fill', '#3a6db5');
      })
      .on('mouseleave', function (_, d) {
        d3.select(this).attr('fill', selected === d.district ? '#1565c0' : '#5e81c0');
      });

    // Count labels
    g.selectAll('.label')
      .data(districtSeatCounts)
      .join('text')
      .attr('class', 'label')
      .attr('x', (d) => x(d.count) + 4)
      .attr('y', (d) => y(d.district) + y.bandwidth() / 2 + 4)
      .attr('font-size', 11)
      .attr('fill', '#555')
      .text((d) => d.count);

    // Y axis
    g.append('g')
      .call(d3.axisLeft(y).tickSize(0))
      .call((gg) => {
        gg.select('.domain').remove();
        gg.selectAll('text')
          .attr('font-size', 11)
          .attr('fill', (d) => (selected === d ? '#1565c0' : '#333'))
          .attr('font-weight', (d) => (selected === d ? '700' : '400'))
          .attr('dx', -4);
      });

    // X axis
    g.append('g')
      .attr('transform', `translate(0,${INNER_H})`)
      .call(d3.axisBottom(x).ticks(5))
      .call((gg) => {
        gg.select('.domain').remove();
        gg.selectAll('text').attr('font-size', 10).attr('fill', '#888');
      });
  }, [selected, onSelect]);

  return (
    <div className="chart-card">
      <h3 className="chart-title">Seats per District</h3>
      <p className="chart-hint">Click a bar to filter constituencies</p>
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }} />
    </div>
  );
}
