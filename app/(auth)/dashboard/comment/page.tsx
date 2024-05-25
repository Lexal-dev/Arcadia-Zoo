"use client"
import { MdAddCircleOutline } from "react-icons/md";
import DataTab from "@/components/data/comments/DataTab";
import useModal from "@/app/hooks/useModal";
import CommentFormModal from "@/components/ui/comment/CommentFormModal";
import { CommentsProvider } from "@/app/context/commentsContext";

export default function Comment() {

  const {onOpen, openModal, onClose} = useModal()

  return (
    <CommentsProvider>
      <main className="flex flex-col items-center h-full w-full p-12 gap-6">
        <h1 className="text-4xl font-bold">Commentaires:</h1>
        <DataTab/>
        <CommentFormModal onOpen={onOpen} onClose={onClose} openModal={openModal}/>
        <button onClick={onOpen} className="p-2 rounded-md hover:bg-gray-200 text-gray-800 mb-5 flex items-center gap-2">
          <MdAddCircleOutline />
          <span>Ajouter un commentaire</span>
        </button>
      </main>
    </CommentsProvider>
  );
}
