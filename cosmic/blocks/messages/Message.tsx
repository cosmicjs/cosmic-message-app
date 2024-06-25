"use client";

import { deleteMessage } from "@/cosmic/blocks/messages/actions";
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
    <div className="mb-8 border rounded-xl p-6 relative bg-white dark:bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="font-semibold">{message.metadata.message}</div>
        <div className="absolute right-0 top-0 p-6">
          {timeAgo(message.created_at)}
        </div>
      </div>
      {message.metadata?.image?.imgix_url && (
        <div className="mt-4">
          <img
            src={`${message.metadata?.image?.imgix_url}?w=600&auto=format,compression`}
            alt={message.metadata?.image?.imgix_url}
            className="h-[150px] w-[200px] rounded-xl object-cover"
          />
        </div>
      )}
      <div className="absolute right-0 bottom-0 p-4">
        {deleting ? (
          <LoaderCircleIcon className="w-4 h-4 m-auto animate-spin" />
        ) : (
          <TrashIcon
            className="text-red-500 w-4 h-4 cursor-pointer"
            onClick={async () => {
              setDeleting(true);
              await handleDeleteClick(message.id);
              router.refresh();
              setDeleting(false);
            }}
          />
        )}
      </div>
    </div>
  );
};