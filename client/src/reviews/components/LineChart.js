import React, { useRef, useEffect } from 'react';
import { select, scaleBand, scaleLinear } from 'd3';
import useResizeObserver from '../utils/useResizeObserver';
import rightRoundedRect from '../utils/handleCornersSvg';

function LineChart({ data, split }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    const yScale = scaleBand()
      .paddingInner(0.6)
      .domain(data.map((value, index) => index)) // [0]
      .range([0, dimensions.height]); // [0, 200]

    const xScale = scaleLinear().domain([0, 100]).range([0, dimensions.width]);

    // draw the background bars
    if (!split) {
      svg
        .selectAll('.bg_full')
        .data(data, (entry, index) => entry.name)
        .join((enter) =>
          enter
            .append('path')
            .attr('d', (entry, index) =>
              rightRoundedRect(
                0,
                yScale(index) + 6,
                dimensions.width / 3.16 +
                  dimensions.width / 3.16 +
                  dimensions.width / 3.16,
                yScale.bandwidth() + 3,
                0
              )
            )
        )
        .attr('class', 'bg_full')
        .style('fill', '#bebebe')
        .transition()
        .duration(1000)
        .attr('d', (entry, index) =>
          rightRoundedRect(
            0,
            yScale(index) + 6,
            dimensions.width / 3.16 +
              dimensions.width / 3.16 +
              dimensions.width / 3.16,
            yScale.bandwidth() + 3,
            0
          )
        );
    } else {
      svg
        .selectAll('.bg')
        .data(data, (entry, index) => entry.name)
        .join((enter) =>
          enter
            .append('path')
            .attr('d', (entry, index) =>
              rightRoundedRect(
                0,
                yScale(index) + 6,
                dimensions.width / 3.16 - 2,
                yScale.bandwidth() + 3,
                0
              )
            )
        )
        .attr('class', 'bg')
        .style('fill', '#bebebe') //#dee2e6 #ced4da
        .transition()
        .duration(1000)
        .attr('d', (entry, index) =>
          rightRoundedRect(
            0,
            yScale(index) + 6,
            dimensions.width / 3.16 - 2,
            yScale.bandwidth() + 3,
            0
          )
        );

      svg
        .selectAll('.bg2')
        .data(data, (entry, index) => entry.name)
        .join((enter) =>
          enter
            .append('path')
            .attr('d', (entry, index) =>
              rightRoundedRect(
                dimensions.width / 3.16 + 2,
                yScale(index) + 6,
                dimensions.width / 3.16 - 2,
                yScale.bandwidth() + 3,
                0
              )
            )
        )
        .attr('class', 'bg2')
        .style('fill', '#bebebe') //#dee2e6 #ced4da
        .transition()
        .duration(1000)
        .attr('d', (entry, index) =>
          rightRoundedRect(
            dimensions.width / 3.16 + 2,
            yScale(index) + 6,
            dimensions.width / 3.16 - 2,
            yScale.bandwidth() + 3,
            0
          )
        );

      svg
        .selectAll('.bg3')
        .data(data, (entry, index) => entry.name)
        .join((enter) =>
          enter
            .append('path')
            .attr('d', (entry, index) =>
              rightRoundedRect(
                dimensions.width / 3.16 + dimensions.width / 3.16 + 4,
                yScale(index) + 6,
                dimensions.width / 3.16 - 2,
                yScale.bandwidth() + 3,
                0
              )
            )
        )
        .attr('class', 'bg3')
        .style('fill', '#bebebe')
        .transition()
        .duration(1000)
        .attr('d', (entry, index) =>
          rightRoundedRect(
            dimensions.width / 3.16 + dimensions.width / 3.16 + 4,
            yScale(index) + 6,
            dimensions.width / 3.16 - 2,
            yScale.bandwidth() + 3,
            0
          )
        );
    }

    // draw the labels
    if (split) {
      svg
        .selectAll('.label')
        .data(data, (entry, index) => entry.name)
        .enter()
        .append('text')
        .attr('x', 0)
        .attr(
          'y',
          (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 28
        )
        .style('text-anchor', 'start')
        // .style('text-decoration', 'underline')
        .text((entry, index) => entry.labels[0])
        .attr('class', 'label')
        .transition()
        .duration(1000)
        .attr('x', 0)
        .attr(
          'y',
          (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 28
        );

      svg
        .selectAll('.label3')
        .data(data, (entry, index) => entry.name)
        .join((enter) =>
          enter
            .append('text')
            .attr('x', dimensions.width / 3.16 + dimensions.width / 3.16 / 2)
            .attr(
              'y',
              (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 28
            )
            .style('text-anchor', 'middle')
            // .style('text-decoration', 'underline')
            .text((entry, index) => entry.labels[1])
        )
        .attr('class', 'label3')
        .transition()
        .duration(1000)
        .attr('x', dimensions.width / 3.16 + dimensions.width / 3.16 / 2)
        .attr(
          'y',
          (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 28
        );

      svg
        .selectAll('.label2')
        .data(data, (entry, index) => entry.name)
        .join((enter) =>
          enter
            .append('text')
            .attr(
              'x',
              (entry, index) =>
                dimensions.width / 3.16 +
                dimensions.width / 3.16 +
                dimensions.width / 3.16 -
                entry.labels[2].length +
                10
            )
            .attr(
              'y',
              (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 28
            )
            .style('text-anchor', 'end')
            // .style('text-decoration', 'underline')
            .text((entry, index) => entry.labels[2])
        )
        .attr('class', 'label2')
        .transition()
        .duration(1000)
        .attr(
          'x',
          (entry, index) =>
            dimensions.width / 3.16 +
            dimensions.width / 3.16 +
            dimensions.width / 3.16 -
            entry.labels[1].length +
            4
        )
        .attr(
          'y',
          (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 28
        );
    } else {
      svg
        .selectAll('.label')
        .data(data, (entry, index) => entry.name)
        .join((enter) =>
          enter
            .append('text')
            .attr('x', 0)
            .attr(
              'y',
              (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 28
            )
            .style('text-anchor', 'start')
            // .style('text-decoration', 'underline')
            .text((entry, index) => entry.labels[0])
        )
        .attr('class', 'label')
        .transition()
        .duration(1000)
        .attr('x', 0)
        .attr(
          'y',
          (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 28
        );

      svg
        .selectAll('.label2')
        .data(data, (entry, index) => entry.name)
        .join((enter) =>
          enter
            .append('text')
            .attr(
              'x',
              (entry, index) =>
                dimensions.width / 3.16 +
                dimensions.width / 3.16 +
                dimensions.width / 3.16 -
                entry.labels[1].length +
                4
            )
            .attr(
              'y',
              (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 28
            )
            .style('text-anchor', 'end')
        )
        // .style('text-decoration', 'underline')
        .text((entry, index) => entry.labels[1])
        .attr('class', 'label2')
        .transition()
        .duration(1000)
        .attr(
          'x',
          (entry, index) =>
            dimensions.width / 3.16 +
            dimensions.width / 3.16 +
            dimensions.width / 3.16 -
            entry.labels[1].length +
            4
        )
        .attr(
          'y',
          (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 28
        );
    }

    let svgImg = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 256 256" style="enable-background:new 0 0 256 256;" xml:space="preserve">
 <g>
   <g>
     <polygon points="225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093"/>
   </g>
 </g>
  </svg>`;

    // draw arrow markers
    svg
      .selectAll('.point')
      .data(data, (entry, index) => entry.name)
      .join((enter) =>
        enter
          .append('svg')
          .attr('width', 40)
          .attr('height', 40)
          .attr('y', (entry, index) => yScale(index) - 15)
          .html(svgImg)
      )
      .attr('class', 'point')
      .transition()
      .duration(2400)
      .attr('y', (entry, index) => yScale(index) - 15)
      .attr('x', (entry) => xScale(entry.value));
  }, [data, dimensions, split]);

  return (
    <div ref={wrapperRef} className='chart__line'>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default LineChart;
