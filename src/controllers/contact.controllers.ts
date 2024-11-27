import { Hono } from "hono";
import { ApplicationVariables } from "../models/app.model";
import { authMiddleware } from "../middlewares/auth.middleware";
import { User } from "@prisma/client";
import { ContactService } from "../services/contact.services";
import { CreateContactRequest } from "../models/contact.model";

export const contactController = new Hono<{
  Variables: ApplicationVariables;
}>();

contactController.use(authMiddleware);

contactController.post("/api/contacts", async (c) => {
  const user = c.get("user") as User;
  const request = (await c.req.json()) as CreateContactRequest;
  const response = await ContactService.create(user, request);

  return c.json({
    data: response,
  });
});
