import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { FRONTS, PARTY_META } from '../data/election2026';

const W = 300, H = 300, R = 110, IR = 62;

export default function FrontChart({ constituencies }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Count candidates per front
    const counts = {};
    constituencies.forEach((con) => {
      con.candidates.forEach((cand) => {
        const front = PARTY_META[cand.party]?.front ?? 'IND';
        counts[front] = (counts[front] ?? 0) + 1;
      });
    });

    const data = Object.entries(counts)
      .filter(([, v]) => v > 0)
      .map(([front, count]) => ({ front, count, color: FRONTS[front]?.color ?? '#999' }));

    const total = d3.sum(data, (d) => d.count);

    const pie = d3.pie().sort(null).value((d) => d.count);
    const arc = d3.arc().innerRadius(IR).outerRadius(R);
    const arcHover = d3.arc().innerRadius(IR).outerRadius(R + 8);

    const g = svg
      .append('g')
      .attr('transform', `translate(${W / 2},${H / 2 - 10})`);

    const slices = g
      .selectAll('.slice')
      .data(pie(data))
      .join('g')
      .attr('class', 'slice')
      .attr('cursor', 'pointer');

    slices
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => d.data.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .on('mouseenter', function () {
        d3.select(this).transition().duration(150).attr('d', arcHover);
      })
      .on('mouseleave', function () {
        d3.select(this).transition().duration(150).attr('d', arc);
      });

    // Percentage labels on slices
    slices
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('font-size', 12)
      .attr('font-weight', '600')
      .attr('fill', '#fff')
      .text((d) => `${Math.round((d.data.count / total) * 100)}%`);

    // Centre label
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('font-size', 13)
      .attr('fill', '#555')
      .text(`${total}`);
    g.append('text')
      .attr('dy', 16)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('font-size', 10)
      .attr('fill', '#999')
      .text('candidates');

    // Legend
    const legend = svg
      .append('g')
      .attr('transform', `translate(${W / 2 - (data.length * 70) / 2},${H - 28})`);

    data.forEach((d, i) => {
      const item = legend.append('g').attr('transform', `translate(${i * 72},0)`);
      item.append('rect').attr('width', 12).attr('height', 12).attr('fill', d.color).attr('rx', 2);
      item
        .append('text')
        .attr('x', 16)
        .attr('y', 10)
        .attr('font-size', 11)
        .attr('fill', '#333')
        .text(`${d.front} (${d.count})`);
    });
  }, [constituencies]);

  return (
    <div className="chart-card">
      <h3 className="chart-title">Candidates by Front</h3>
      <p className="chart-hint">Based on current filter</p>
      <svg ref={svgRef} width={W} height={H} />
    </div>
  );
}
