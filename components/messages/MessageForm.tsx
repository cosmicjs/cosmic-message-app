/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, KeyboardEvent } from "react";
import { CheckIcon, Loader2, XIcon, SendIcon } from "lucide-react";
import { cn } from "@/cosmic/utils";

import { Button } from "@/cosmic/elements/Button";
import { Textarea } from "@/cosmic/elements/TextArea";
import { addMessage, AddMessageType } from "@/components/messages/actions";
import { FileUpload, FileType } from "@/cosmic/blocks/file-upload/FileUpload";
import { useRouter } from "next/navigation";

export function MessageForm({ className }: { className?: string }) {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<FileType | null>();
  const [submitting, setSubmitting] = useState(false);
  const [sumbitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  async function handleSubmitMessage() {
    setError(false);
    setSubmitting(true);
    setMessage(message.trim());
    if (!message.trim()) {
      setSubmitting(false);
      setError(true);
      return;
    }
    const submission: AddMessageType = {
      type: "messages",
      title: message.substring(0, 60), // Limit title length
      metadata: {
        image: image?.name,
        message,
      },
    };
    try {
      const res = await addMessage(submission);
      if (!res.object) {
        setSubmitting(false);
        setError(true);
      } else {
        router.refresh();
        setSubmitting(false);
        setSubmitted(true);
        setMessage("");
        setImage(null);
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      }
    } catch (err) {
      setSubmitting(false);
      setError(true);
      return;
    }
  }
  function handleChangeMessage(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setMessage(target.value);
  }
  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.metaKey && e.key === "Enter") {
      handleSubmitMessage();
    }
  }
  return (
    <div className={cn("mb-8", className)}>
      <h2 className="mb-4 text-2xl">Send a message</h2>
      {error && (
        <div className="mb-4 flex rounded-xl border border-red-500 text-red-500 p-4">
          <XIcon className="shrink-0 relative top-1 mr-4 h-4 w-4 text-red-500" />
          Message required.
        </div>
      )}
      <div className="mb-4">
        <Textarea
          id="message"
          placeholder="What's happening?"
          onChange={handleChangeMessage}
          onKeyDown={handleKeyDown}
          value={message}
          className={`text-base ${error ? "!border-red-500" : ""}`}
          onClick={() => setError(false)}
          autoFocus
        />
      </div>
      <div className="h-[140px] overflow-hidden">
        {image ? (
          <img
            className="h-[120px] w-[180px] rounded-xl object-cover"
            src={`${image.imgix_url}?w=600&h=600&fit=crop&auto=format,compression`}
            alt={image.name}
          />
        ) : (
          <FileUpload
            className="bg-white dark:bg-gray-900 rounded-xl"
            autoUpload
            onComplete={(response) => {
              // Do something with the response here
              if (response?.media?.length) setImage(response?.media[0]);
            }}
          />
        )}
      </div>
      <div>
        <Button
          onClick={handleSubmitMessage}
          type="submit"
          disabled={submitting || !message.trim()}
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <SendIcon className="mr-2 h-4 w-4" />
              Send
            </>
          )}
        </Button>
      </div>
      {sumbitted && (
        <div className="mt-6 flex rounded-xl border border-green-500 text-green-500 p-4">
          <CheckIcon className="shrink-0 relative top-1 mr-4 h-4 w-4 text-green-500" />
          Message sent.
        </div>
      )}
    </div>
  );
}
