"use server";
import { cosmic } from "@/cosmic/client";

export type MessageType = {
  type: "messages";
  title: string;
  metadata: {
    message: string;
    image?: string;
  };
};

export async function addMessage(message: MessageType) {
  const data = await cosmic.objects.insertOne(message);
  return data;
}

export async function deleteMessage(id: string) {
  const data = await cosmic.objects.deleteOne(id);
  return data;
}
