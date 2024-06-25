import { MessageForm } from "@/components/messages/MessageForm";
import { MessageList } from "@/components/messages/MessageList";
import { GitHubLink } from "@/components/GitHubLink";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="p-4 md:p-24">
      <GitHubLink />
      <MessageForm className="w-full max-w-[500px] m-auto" />
      <MessageList className="w-full max-w-[500px] m-auto mt-6" />
    </main>
  );
}
