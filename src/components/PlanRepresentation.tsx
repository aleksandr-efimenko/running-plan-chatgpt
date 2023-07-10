import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import listPlugin from "@fullcalendar/list";
import { type EventSourceInput } from "@fullcalendar/core";

export type RunningPlanData = {
  date: string;
  training: string;
};

export function PlanRepresentation({ plan }: { plan: RunningPlanData[] }) {
  const myEventsList: EventSourceInput = plan.map((planData) => {
    return {
      title: planData.training,
      date: new Date(planData.date),
      allDay: true,
    };
  });
  return (
    <div className="container mx-auto max-w-5xl">
      <FullCalendar
        plugins={[dayGridPlugin, multiMonthPlugin, listPlugin]}
        initialView="multiMonthYear"
        multiMonthMaxColumns={1}
        weekends={true}
        events={myEventsList}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "multiMonthYear,listYear",
        }}
      />
    </div>
  );
}
