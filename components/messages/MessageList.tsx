/* eslint-disable @next/next/no-img-element */
import { Message, MessageType } from "@/components/messages/Message";
import { getMessages } from "@/components/messages/actions";

export async function MessageList({ className }: { className: string }) {
  try {
    const messages = await getMessages();
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
