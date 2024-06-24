/* eslint-disable @next/next/no-img-element */
import { cosmic } from "@/cosmic/client";

type MessageType = {
  title: string;
  id: string;
  metadata: {
    message: string;
    image?: {
      imgix_url?: string;
    };
  };
};
const Message = ({ message }: { message: MessageType }) => {
  return (
    <div className="mb-8 border rounded-xl p-6">
      <div className="font-semibold">{message.metadata.message}</div>
      {message.metadata?.image?.imgix_url && (
        <div className="mt-4">
          <img
            src={`${message.metadata?.image?.imgix_url}?w=600&auto=format,compression`}
            alt={message.metadata?.image?.imgix_url}
            className="h-[150px] w-[200px] rounded-xl object-cover"
          />
        </div>
      )}
    </div>
  );
};

export async function MessageList({ className }: { className: string }) {
  try {
    const { objects: messages } = await cosmic.objects
      .find({
        type: "messages",
      })
      .sort("-created_at");
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
