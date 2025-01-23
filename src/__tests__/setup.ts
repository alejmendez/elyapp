import { afterAll, beforeAll } from "bun:test";
import { runApp, stopApp } from "./helpers";

beforeAll(() => {
  runApp();
});

afterAll(async () => {
  await stopApp();
});
