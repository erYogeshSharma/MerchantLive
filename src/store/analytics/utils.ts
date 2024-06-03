import { Visit } from "@/types/business";
import moment from "moment";

//Function to get chartData from visits
export const getLineChartData = (
  visits: Visit[],
  startDate: string,
  endDate: string
) => {
  const graphData: { label: string; y: number; x: number }[] = [];
  const isDayGraph = moment(endDate).diff(moment(startDate), "days") === 0;
  visits.forEach((visit) => {
    const date = moment(visit.visitedOn).format(
      isDayGraph ? "hh:MM A" : "DD MMM YY"
    );
    const index = graphData.findIndex((d) => d.label === date);
    if (index === -1) {
      graphData.push({
        label: date,
        y: 1,
        x: isDayGraph
          ? moment(visit.visitedOn).hour()
          : moment(visit.visitedOn).get("dayOfYear"),
      });
    } else {
      graphData[index].y += 1;
    }
  });
  console.log(startDate, endDate);
  return graphData;
};

//Function to get unique visitors from visits
export function getUniqueVisitors(visits: Visit[]) {
  const uniqueVisitors: string[] = [];
  visits.forEach((visit) => {
    if (uniqueVisitors.indexOf(visit.ip) === -1) {
      uniqueVisitors.push(visit.ip);
    }
  });
  return uniqueVisitors.length;
}
