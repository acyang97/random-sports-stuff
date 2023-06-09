import { useEffect, useRef } from "react";
import {
  axisBottom,
  axisLeft,
  ScaleBand,
  scaleBand,
  ScaleLinear,
  scaleLinear,
  select,
} from "d3";
// https://github.com/rsuite/rsuite/issues/1953
import "rsuite/dist/rsuite-no-reset.min.css";
import { Tooltip, Whisper } from "rsuite";

export interface IBarChart {
  dataName: string;
  data: IData[];
}
export interface IData {
  label: string;
  value: number;
}

interface BarChartProps {
  dataName: string;
  data: IData[];
}

interface AxisBottomProps {
  scale: ScaleBand<string>;
  transform: string;
}

interface AxisLeftProps {
  scale: ScaleLinear<number, number, never>;
}

interface BarsProps {
  data: BarChartProps["data"];
  height: number;
  scaleX: AxisBottomProps["scale"];
  scaleY: AxisLeftProps["scale"];
}

function AxisBottom({ scale, transform }: AxisBottomProps) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisBottom(scale));
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
}

function AxisLeft({ scale }: AxisLeftProps) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisLeft(scale));
    }
  }, [scale]);

  return <g ref={ref} />;
}

function Bars({ data, height, scaleX, scaleY }: BarsProps) {
  return (
    <>
      {data.map(({ value, label }) => (
        <Whisper
          key={`bar-${label}`}
          followCursor
          speaker={<Tooltip>{`${value}`}</Tooltip>}
        >
          <rect
            key={`bar-${label}`}
            x={scaleX(label)}
            y={scaleY(value)}
            width={scaleX.bandwidth()}
            height={height - scaleY(value)}
            fill="teal"
          />
        </Whisper>
      ))}
    </>
  );
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  dataName,
}: BarChartProps) => {
  const margin = { top: 10, right: 0, bottom: 20, left: 30 };
  const width = 550 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // Data has a label property (Which can be any name according to our json
  const scaleX = scaleBand()
    .domain(data.map(({ label }) => label))
    .range([0, width])
    .padding(0.5);
  // value of the data[label]
  const scaleY = scaleLinear()
    .domain([0, Math.max(...data.map(({ value }) => value))])
    .range([height, 0]);

  return (
    // Creating an vg element with width and height
    // We have to adjust our svg width and height by adding
    // the same margin to the svg
    <>
      <h3 className="text-2xl bold my-2">{dataName}</h3>
      <div className="flex justify-center mb-3">
        <svg
          width={width + margin.left + margin.right}
          height={height + margin.top + margin.bottom}
        >
          {/* g is a container for elements that will come next, which is the y-axis, x-axis and bars */}
          {/* Not too sure why translation is necessary */}
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
            <AxisLeft scale={scaleY} />
            <Bars data={data} height={height} scaleX={scaleX} scaleY={scaleY} />
          </g>
        </svg>
      </div>
    </>
  );
};

export default BarChart;
