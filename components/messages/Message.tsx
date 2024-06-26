/* eslint-disable @next/next/no-img-element */
"use client";

import { deleteMessage } from "@/components/messages/actions";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LoaderCircleIcon } from "lucide-react";

const handleDeleteClick = async (id: string) => {
  await deleteMessage(id);
};
import { timeAgo } from "./timeAgo";
import { TrashIcon } from "lucide-react";

export type MessageType = {
  title: string;
  id: string;
  created_at: string;
  metadata: {
    message: string;
    image?: {
      imgix_url?: string;
    };
  };
};

export const Message = ({ message }: { message: MessageType }) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [createdAgo, setCreatedAgo] = useState<string | null>(null);
  useEffect(() => {
    setCreatedAgo(timeAgo(message.created_at));
  }, [message.created_at]);

  return (
    <div
      className={`mb-8 border rounded-xl p-6 pb-12 relative bg-white dark:bg-gray-900 ${
        deleting ? "opacity-55" : ""
      }`}
    >
      <div>
        <div className="font-semibold mb-1">{message.metadata.message}</div>
        <div className="text-sm h-4">
          {createdAgo ? (
            createdAgo
          ) : (
            <LoaderCircleIcon className="w-4 h-4 animate-spin" />
          )}
        </div>
      </div>
      {message.metadata?.image?.imgix_url && (
        <a
          href={`${message.metadata?.image?.imgix_url}?w=1200&auto=format,compression`}
          target="_blank"
          className="mt-4 block w-full"
        >
          <img
            src={`${message.metadata?.image?.imgix_url}?w=600&auto=format,compression`}
            alt={message.metadata?.image?.imgix_url}
            className="h-[250px] w-full rounded-xl object-cover"
          />
        </a>
      )}
      <div className="absolute right-0 bottom-0 p-4">
        {deleting ? (
          <LoaderCircleIcon className="w-4 h-4 m-auto animate-spin" />
        ) : (
          <TrashIcon
            className="w-4 h-4 cursor-pointer"
            onClick={async () => {
              setDeleting(true);
              await handleDeleteClick(message.id);
              router.refresh();
            }}
          />
        )}
      </div>
    </div>
  );
};
