import { type RunningPlanData } from "~/components/PlanRepresentation";

export function convertCsvToObject(csv: string): RunningPlanData[] {
  const lines = csv.split("\n");
  if (!lines || !lines[0]) return []; // check if lines or its first element is undefined
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    const currentline = lines[i]?.split(",");
    if (!currentline || !currentline[0] || !currentline[1]) continue; // check if currentline or its first and second element is undefined
    const obj = {
      date: currentline[0],
      training: currentline[1],
    };
    result.push(obj);
  }
  return result;
}
