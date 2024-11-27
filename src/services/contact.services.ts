import { User } from "@prisma/client";
import {
  ContactResponse,
  CreateContactRequest,
  toContactResponse,
} from "../models/contact.model";
import { ContactValidation } from "../validations/contact.validation";
import { prisma } from "../application/database";

export class ContactService {
  static async create(
    user: User,
    request: CreateContactRequest
  ): Promise<ContactResponse> {
    request = ContactValidation.CREATE.parse(request);

    let data = {
      ...request,
      ...{ username: user.username },
    };

    const contact = await prisma.contact.create({
      data: data,
    });

    return toContactResponse(contact);
  }
}
