import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import Database from "better-sqlite3";

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const schema = fs.readFileSync(path.join(projectRoot, "schema.sql"), "utf8");

export function connect(databasePath) {
  const database = new Database(databasePath, { timeout: 5_000 });
  database.pragma("foreign_keys = ON");
  return database;
}

export function initialise(databasePath) {
  fs.mkdirSync(path.dirname(databasePath), { recursive: true });
  const database = connect(databasePath);
  database.exec(schema);
  database.close();
}

