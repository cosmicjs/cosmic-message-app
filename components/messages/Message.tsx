/* eslint-disable @next/next/no-img-element */
"use client";

import { deleteMessage } from "@/components/messages/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

  return (
    <div
      className={`mb-8 border rounded-xl p-6 relative bg-white dark:bg-gray-900 ${
        deleting ? "opacity-55" : ""
      }`}
    >
      <div>
        <div className="font-semibold mb-1">{message.metadata.message}</div>
        <div className="text-sm">{timeAgo(message.created_at)}</div>
      </div>
      {message.metadata?.image?.imgix_url && (
        <a
          href={`${message.metadata?.image?.imgix_url}?w=1200&auto=format,compression`}
          target="_blank"
          className="mt-4 block w-[200px]"
        >
          <img
            src={`${message.metadata?.image?.imgix_url}?w=600&auto=format,compression`}
            alt={message.metadata?.image?.imgix_url}
            className="h-[150px] w-[200px] rounded-xl object-cover"
          />
        </a>
      )}
      <div className="absolute right-0 bottom-0 p-4">
        {deleting ? (
          <LoaderCircleIcon className="text-red-500 w-4 h-4 m-auto animate-spin" />
        ) : (
          <TrashIcon
            className="text-red-500 w-4 h-4 cursor-pointer"
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
