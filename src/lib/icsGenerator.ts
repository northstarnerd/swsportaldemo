export function generateSwsCalendarIcs(): string {
  const now = new Date();
  const formatIcsDate = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  // Create recurring events for Thursdays
  // Weekly Trash + Organics, Bi-weekly Recycling
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Suburban Waste Services//Eden Prairie Schedule//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:SWS Trash & Recycling Schedule",
    "X-WR-TIMEZONE:America/Chicago",
    
    // Event 1: Weekly Trash & Organics (Every Thursday at 7:00 AM)
    "BEGIN:VEVENT",
    `UID:sws-trash-organics-${Date.now()}@suburbanwastemn.com`,
    `DTSTAMP:${formatIcsDate(now)}`,
    "DTSTART;TZID=America/Chicago:20260827T070000",
    "DTEND;TZID=America/Chicago:20260827T080000",
    "RRULE:FREQ=WEEKLY;BYDAY=TH",
    "SUMMARY:🗑️ SWS Pickup: Trash & Organics",
    "DESCRIPTION:Put out your 96-gal Trash cart and 35-gal Organics cart by 6:30 AM curbside.",
    "LOCATION:6484 Promontory Drive, Eden Prairie MN",
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT12H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: Put out SWS Trash & Organics tonight!",
    "END:VALARM",
    "END:VEVENT",

    // Event 2: Bi-weekly Recycling (Every 2nd Thursday starting Sept 3)
    "BEGIN:VEVENT",
    `UID:sws-recycling-${Date.now()}@suburbanwastemn.com`,
    `DTSTAMP:${formatIcsDate(now)}`,
    "DTSTART;TZID=America/Chicago:20260903T070000",
    "DTEND;TZID=America/Chicago:20260903T080000",
    "RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=TH",
    "SUMMARY:♻️ SWS Pickup: Recycling Day",
    "DESCRIPTION:Put out your 96-gal Single-Stream Recycling cart by 6:30 AM curbside.",
    "LOCATION:6484 Promontory Drive, Eden Prairie MN",
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT12H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: Tomorrow is Recycling Day!",
    "END:VALARM",
    "END:VEVENT",

    "END:VCALENDAR",
  ].join("\r\n");

  return icsContent;
}

export function generateGoogleCalendarUrl(): string {
  const title = encodeURIComponent("🗑️ SWS Pickup: Trash & Organics");
  const details = encodeURIComponent(
    "Curbside pickup for 96-gal Trash cart & 35-gal Organics cart.\n\nSWS Eden Prairie Route. Put bins out by 6:30 AM.\nRecycling runs bi-weekly (Next: Sept 3)."
  );
  const location = encodeURIComponent("6484 Promontory Drive, Eden Prairie MN");
  // Recurrence rule: RRULE:FREQ=WEEKLY;BYDAY=TH
  const recur = encodeURIComponent("RRULE:FREQ=WEEKLY;BYDAY=TH");
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20260827T120000Z/20260827T130000Z&details=${details}&location=${location}&recur=${recur}`;
}

export function generateOutlookCalendarUrl(): string {
  const subject = encodeURIComponent("🗑️ SWS Pickup: Trash & Organics");
  const body = encodeURIComponent(
    "Curbside pickup for 96-gal Trash cart & 35-gal Organics cart. Put bins out by 6:30 AM."
  );
  const location = encodeURIComponent("6484 Promontory Drive, Eden Prairie MN");
  
  return `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&startdt=2026-08-27T07:00:00&enddt=2026-08-27T08:00:00&subject=${subject}&body=${body}&location=${location}`;
}

export function downloadCalendarFile() {
  const ics = generateSwsCalendarIcs();
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "SWS_Eden_Prairie_Pickup_Schedule.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

