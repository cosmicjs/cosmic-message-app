import { MessageForm } from "@/cosmic/blocks/messages/MessageForm";
import { MessageList } from "@/cosmic/blocks/messages/MessageList";

export default function Home() {
  return (
    <main className="p-24">
      <MessageForm className="w-full max-w-[500px] m-auto" />
      <MessageList className="w-full max-w-[500px] m-auto mt-6" />
    </main>
  );
}
