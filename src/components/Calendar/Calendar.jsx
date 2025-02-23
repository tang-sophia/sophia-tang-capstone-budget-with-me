import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

const Calendar = ({ currentEvents, handleDateClick, handleEventClick }) => {
  return (
    <FullCalendar
      height="75vh"
      plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
      headerToolbar={{
        left: "prev",
        center: "title",
        right: "today next",
      }}
      initialView="dayGridMonth"
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      select={handleDateClick}
      eventClick={handleEventClick}
      events={currentEvents.length ? currentEvents : []}
    />
  );
};

export default Calendar;
