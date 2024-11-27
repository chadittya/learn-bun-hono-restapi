import { Hono } from "hono";
import { userController } from "./controllers/user.controllers";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";
import { contactController } from "./controllers/contact.controllers";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/", userController);
app.route("/", contactController);

app.onError(async (err, c) => {
  if (err instanceof HTTPException) {
    c.status(err.status);
    return c.json({
      error: err.message,
    });
  } else if (err instanceof ZodError) {
    c.status(400);
    return c.json({
      error: err.message,
    });
  } else {
    c.status(500);
    return c.json({
      error: err.message,
    });
  }
});

export default app;
