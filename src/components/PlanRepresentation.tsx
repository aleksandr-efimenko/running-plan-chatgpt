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
    <div className="container max-h-screen w-full">
      <FullCalendar
        plugins={[dayGridPlugin, multiMonthPlugin, listPlugin]}
        initialView="dayGridMonth"
        multiMonthMaxColumns={1}
        weekends={true}
        events={myEventsList}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,multiMonthYear,listYear",
        }}
      />
    </div>
  );
}
