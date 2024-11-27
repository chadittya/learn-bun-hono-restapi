import { contact } from "@prisma/client";

export type CreateContactRequest = {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
};

export type ContactResponse = {
  id: number;
  firstName: string;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
};

export function toContactResponse(contact: contact): ContactResponse {
  return {
    id: contact.id,
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
  };
}
