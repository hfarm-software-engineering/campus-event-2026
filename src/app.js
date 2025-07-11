import express from "express";

import { connect, initialise } from "./database.js";

export function createApp({ databasePath = "instance/campus-event.sqlite" } = {}) {
  const app = express();
  initialise(databasePath);
  const database = connect(databasePath);

  app.set("view engine", "ejs");
  app.use(express.static("public"));

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

  return app;
}
