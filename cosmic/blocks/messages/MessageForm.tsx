/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { cn } from "@/cosmic/utils";

import { Button } from "@/cosmic/elements/Button";
import { Textarea } from "@/cosmic/elements/TextArea";
import { addMessage, MessageType } from "@/cosmic/blocks/messages/actions";
import { FileUpload, FileType } from "@/cosmic/blocks/file-upload/FileUpload";
import { useRouter } from "next/navigation";

export function MessageForm({ className }: { className?: string }) {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<FileType | null>();
  const [submitting, setSubmitting] = useState(false);
  const [sumbitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  async function handleSubmitComment(e: React.SyntheticEvent) {
    setError(false);
    setSubmitting(true);
    if (!message.trim()) {
      setSubmitting(false);
      setError(true);
      return;
    }
    const submission: MessageType = {
      type: "messages",
      title: message,
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
  return (
    <div className={cn("mb-8", className)}>
      <h2 className="mb-4 text-2xl">Message</h2>
      {error && (
        <div className="mb-4 flex rounded-xl border border-red-500 p-8">
          <XCircle className="shrink-0 relative top-1 mr-4 h-4 w-4 text-red-500" />
          There was an error with your request. Make sure all fields are valid.
        </div>
      )}
      <div className="mb-4">
        <Textarea
          id="message"
          placeholder="Message"
          onChange={handleChangeMessage}
          value={message}
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
          onClick={handleSubmitComment}
          type="submit"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            `Submit`
          )}
        </Button>
      </div>
      {sumbitted && (
        <div className="mt-6 flex rounded-xl border border-green-500 p-8">
          <CheckCircle className="shrink-0 relative top-1 mr-4 h-4 w-4 text-green-500" />
          Message submitted.
        </div>
      )}
    </div>
  );
}
