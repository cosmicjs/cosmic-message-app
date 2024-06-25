/* eslint-disable @next/next/no-img-element */
import { cosmic } from "@/cosmic/client";
import { Message, MessageType } from "@/components/messages/Message";

export async function MessageList({ className }: { className: string }) {
  try {
    const { objects: messages } = await cosmic.objects
      .find({
        type: "messages",
      })
      .sort("-created_at")
      .props("title,metadata,id,created_at");
    return (
      <div className={className}>
        {messages?.map((message: MessageType) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
    );
  } catch (e) {
    return <></>;
  }
}
