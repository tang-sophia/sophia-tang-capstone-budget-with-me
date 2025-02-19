import "../CalendarPage/CalendarPage.scss";
import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Calendar from "../../components/Calendar/Calendar";
import NewCalendarEntryBox from "../../components/NewCalendarEntryBox/NewCalendarEntryBox";

const API_URL = "http://localhost:8080/api/calendar";

const CalendarPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    due_date: "",
    category: "",
    start: "",
    end: "",
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const transformedEvents = data.map((event) => ({
          id: event.id || "default-id",
          title: event.name || "Untitled Event",
          start: event.due_date || new Date().toISOString(),
          end: event.due_date || new Date().toISOString(),
          allDay: true,
        }));

        transformedEvents.sort(
          (a, b) => new Date(a.start || 0) - new Date(b.start || 0)
        );

        setCurrentEvents(transformedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleDateClick = (selected) => {
    setNewEvent({
      ...newEvent,
      start: selected.startStr,
      end: selected.endStr,
      due_date: selected.startStr,
    });
    setOpenDialog(true);
  };

  const handleCategoryChange = (e) => {
    setNewEvent({ ...newEvent, category: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newEvent.name || !newEvent.due_date || !newEvent.category) {
      alert("Please fill out all fields.");
      return;
    }

    const eventStart = newEvent.due_date;
    const eventEnd = newEvent.due_date;

    const newEventData = {
      ...newEvent,
      id: "temp-id",
      start: eventStart,
      end: eventEnd,
      title: newEvent.name,
    };

    setCurrentEvents((prevEvents) => [...prevEvents, newEventData]);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      const savedEvent = await response.json();

      setCurrentEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === "temp-id" ? { ...event, id: savedEvent.id } : event
        )
      );

      setNewEvent((prev) => ({
        ...prev,
        name: "",
        category: "",
      }));

      setOpenDialog(false);
    } catch (error) {
      alert("Error adding event");
      console.error("Error adding event:", error);

      setCurrentEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== "temp-id")
      );
    }
  };

  const handleEventClick = async (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'?`
      )
    ) {
      try {
        await fetch(`${API_URL}/${selected.event.id}`, {
          method: "DELETE",
        });

        selected.event.remove();
        setCurrentEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== selected.event.id)
        );
      } catch (error) {
        alert("Error deleting event");
        console.error("Error deleting event:", error);
      }
    }
  };

  return (
    <Box m="20px">
      <Typography variant="h1">CALENDAR</Typography>
      <Typography variant="h4" className="calendar__subtitle">
        Full Calendar Interactive Page
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Box flex="1 1 100%" ml={{ xs: "0", md: "15px" }}>
          <Calendar
            currentEvents={currentEvents}
            handleDateClick={handleDateClick}
            handleEventClick={handleEventClick}
            views={["dayGridMonth"]}
          />
        </Box>
      </Box>

      <NewCalendarEntryBox
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        handleSubmit={handleSubmit}
        handleCategoryChange={handleCategoryChange}
        handleChange={handleChange}
      />
    </Box>
  );
};

export default CalendarPage;
