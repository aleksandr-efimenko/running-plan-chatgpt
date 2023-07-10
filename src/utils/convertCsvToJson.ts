import { RunningPlanData } from "~/components/PlanRepresentation";

export function convertCsvToObject(csv: string): RunningPlanData[] {
  const lines = csv.split("\n");
  if (!lines || !lines[0]) return []; // check if lines or its first element is undefined
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    const currentline = lines[i].split(",");
    const obj = {
      date: currentline[0] as string,
      training: currentline[1] as string,
    };
    result.push(obj);
  }
  return result;
}
