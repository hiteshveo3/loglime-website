"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";
import { useState } from "react";

import { Badge, Button, Card, Drawer, Input, PageHeader, Select, Textarea, useToast } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";

type CalendarEvent = {
  id: string; title: string; description: string | null; event_date: string | null;
  event_time: string | null; attendees: string | null; type: string | null;
};

export function CalendarClient() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [newEventOpen, setNewEventOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [type, setType] = useState("meeting");
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { data: events = [] } = useQuery({
    queryKey: ["crm-calendar-events"],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from("calendar_events").select("*").order("event_date", { ascending: true });
      return (data ?? []) as unknown as CalendarEvent[];
    },
  });

  const createEventMutation = useMutation({
    mutationFn: async () => {
      const supabase = createClient();
      const { error } = await supabase.from("calendar_events").insert({ title, description, event_date: eventDate, event_time: eventTime, type } as any);
      if (error) throw error;
    },
    onSuccess: async () => {
      setNewEventOpen(false); setTitle(""); setDescription(""); setEventDate(""); setEventTime(""); setType("meeting");
      await queryClient.invalidateQueries({ queryKey: ["crm-calendar-events"] });
      showToast({ title: "Event created", tone: "success" });
    },
    onError: () => showToast({ title: "Could not create event", tone: "error" }),
  });

  const daysInMonth = eachDayOfInterval({ start: startOfMonth(currentMonth), end: endOfMonth(currentMonth) });
  const monthEvents = events.filter(e => e.event_date && isSameMonth(new Date(e.event_date), currentMonth));
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Calendar"
        subtitle="Schedule meetings, deadlines, and team events."
        actions={
          <Button onClick={() => setNewEventOpen(true)}>
            <i className="hgi-stroke hgi-add-01" />New Event
          </Button>
        }
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-h4 text-text-primary">{format(currentMonth, "MMMM yyyy")}</h2>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                <i className="hgi-stroke hgi-arrow-left-01" />
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                <i className="hgi-stroke hgi-arrow-right-01" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {weekDays.map(day => <div key={day} className="text-center text-caption font-semibold text-text-muted py-2">{day}</div>)}
            {daysInMonth.map(day => {
              const dayEvents = events.filter(e => e.event_date && isSameDay(new Date(e.event_date), day));
              return (
                <div key={day.toISOString()} className={`rounded-xl p-2 text-center text-small ${isSameMonth(day, currentMonth) ? "bg-surface-alt" : "bg-surface-elevated text-text-muted"}`}>
                  <p className="font-semibold">{format(day, "d")}</p>
                  {dayEvents.length > 0 && <div className="mt-1 h-1 w-full bg-coral rounded-full" />}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <h2 className="text-h4 text-text-primary">Upcoming</h2>
          <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
            {monthEvents.length === 0 ? (
              <p className="text-small text-text-muted">No events this month.</p>
            ) : monthEvents.map(event => (
              <div key={event.id} className="rounded-xl border border-border p-3">
                <p className="text-small font-semibold text-text-primary">{event.title}</p>
                <p className="mt-1 text-caption text-text-muted">
                  {event.event_date ? format(new Date(event.event_date), "dd MMM") : ""} {event.event_time ?? ""}
                </p>
                {event.type && <Badge tone="info" className="mt-2">{event.type}</Badge>}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Drawer open={newEventOpen} title="New Event" onClose={() => setNewEventOpen(false)}>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); createEventMutation.mutate(); }}>
          <Input label="Event Title" placeholder="e.g., Team Meeting" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Input label="Date" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
          <Input label="Time" type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
          <Select
            label="Type"
            value={type}
            options={[
              { label: "Meeting", value: "meeting" },
              { label: "Deadline", value: "deadline" },
              { label: "Presentation", value: "presentation" },
              { label: "Workshop", value: "workshop" },
              { label: "Other", value: "other" },
            ]}
            onChange={(e) => setType(e.target.value)}
          />
          <Textarea label="Description" placeholder="Event details..." value={description} onChange={(e) => setDescription(e.target.value)} />
          <Button className="w-full" type="submit" isLoading={createEventMutation.isPending}>Create Event</Button>
        </form>
      </Drawer>
    </div>
  );
}
