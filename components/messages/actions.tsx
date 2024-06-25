"use server";

import { cosmic } from "@/cosmic/client";

export type AddMessageType = {
  type: "messages";
  title: string;
  metadata: {
    message: string;
    image?: string;
  };
};

export async function getMessages() {
  const { objects: messages } = await cosmic.objects
    .find({
      type: "messages",
    })
    .sort("-created_at")
    .props("title,metadata,id,created_at");
  return messages;
}

export async function addMessage(message: AddMessageType) {
  const data = await cosmic.objects.insertOne(message);
  return data;
}

export async function deleteMessage(id: string) {
  const data = await cosmic.objects.deleteOne(id);
  return data;
}
