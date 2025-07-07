import express from "express";

export function createApp() {
  const app = express();

  app.set("view engine", "ejs");
  app.use(express.static("public"));

  app.get("/", (_request, response) => {
    response.render("events", { events: [] });
  });

  return app;
}

