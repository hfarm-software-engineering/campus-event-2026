import express from "express";

import { connect, initialise } from "./database.js";

export function createApp({ databasePath = "instance/campus-event.sqlite" } = {}) {
  const app = express();
  initialise(databasePath);
  const database = connect(databasePath);

  app.set("view engine", "ejs");
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: false }));

  app.get("/", (_request, response) => {
    const events = database.prepare("SELECT id, title, starts_at FROM events").all();
    response.render("events", { events });
  });

  app.get("/events/:eventId", (request, response) => {
    const event = database
      .prepare(`
        SELECT events.id, events.title, events.starts_at, events.capacity,
               events.capacity - COUNT(reservations.id) AS remaining
        FROM events
        LEFT JOIN reservations ON reservations.event_id = events.id
        WHERE events.id = ?
        GROUP BY events.id
      `)
      .get(request.params.eventId);

    if (event === undefined) {
      response.sendStatus(404);
      return;
    }

    response.render("event", { event, message: request.query.message });
  });

  app.post("/events/:eventId/reservations", (request, response) => {
    const availability = database
      .prepare(`
        SELECT events.capacity, COUNT(reservations.id) AS reserved
        FROM events
        LEFT JOIN reservations ON reservations.event_id = events.id
        WHERE events.id = ?
        GROUP BY events.id
      `)
      .get(request.params.eventId);

    if (availability === undefined) {
      response.sendStatus(404);
      return;
    }

    if (availability.reserved >= availability.capacity) {
      response.redirect(`/events/${request.params.eventId}?message=This+event+is+full.`);
      return;
    }

    database
      .prepare(`
        INSERT INTO reservations (event_id, student_id, student_email)
        VALUES (?, ?, ?)
      `)
      .run(request.params.eventId, request.body.studentId, request.body.email);

    response.redirect(`/events/${request.params.eventId}?message=Your+place+is+reserved.`);
  });

  return app;
}
