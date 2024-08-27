const cleanPercentage = (percentage: number) => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
  const isTooHigh = percentage > 100;
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};

const Circle = ({ colour, percentage = 0 }: { colour: string; percentage?: number }) => {
  const r = 15;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - percentage) * circ * 10) / 100; // where stroke will start, e.g. from 15% to 100%.
  return (
    <circle
      r={r}
      cx={16}
      cy={20}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
      strokeWidth={"0.3em"}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
    ></circle>
  );
};

const Text = ({ percentage }: { percentage: number }) => {
  const numberPercentage = percentage * 10;
  return (
    <text x="50%" y="50%" dominantBaseline="central" fill="white" textAnchor="middle" fontSize={"0.8em"}>
      {numberPercentage.toFixed(0)}
    </text>
  );
};

export const CircleBar = ({ percentage, colour }: { percentage: number; colour: string }) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg width={40} height={40}>
      <g transform={`rotate(-90 ${"18 18"})`}>
        <Circle colour="#5fd1d4" />
        <Circle colour={colour} percentage={pct} />
      </g>
      <Text percentage={pct} />
    </svg>
  );
};
