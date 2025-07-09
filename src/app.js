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

  return app;
}
