import { CommentsDataType } from "@/app/types/useTypes"
import useModal from "@/app/hooks/useModal";
import { FaPen, FaTrash  } from "react-icons/fa";
import CommentFormModal from "../../ui/comment/CommentFormModal";
import { useFirebase } from "@/app/context/commentsContext";

export default function DataItems({comment} : {comment: CommentsDataType}){

  const {deleteComments} = useFirebase();

    const formattedDate = comment.createdAt.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

    const {onOpen, onClose, openModal} = useModal()
  return (
    <tr>
        <td className="p-3 text-sm border">{comment.id}</td>
        <td className="p-3 text-sm border">{comment.pseudo}</td>
        <td className="p-3 text-sm border">{comment.comment}</td>
        <td className="p-3 text-sm border">{formattedDate}</td>
        <td className="p-3 text-sm border">{comment.isValid ? "Validé" : "Non-Validé"}</td>
        <td className="p-3 text-sm border">
            <div className="flex items-center gap-5">
                <button onClick={onOpen} className="flex items-center justify-center p-2 rounded-md text-white bg-yellow-500 hover:bg-yellow-600">
                    <FaPen />
                </button>
                <button onClick={() => comment.id && deleteComments(comment.id)} className="flex items-center justify-center p-2 rounded-md text-white bg-red-500 hover:bg-red-600">
                  <FaTrash />
                </button>
            </div>
            <CommentFormModal isUpdate openModal={openModal} onClose={onClose} comment={comment}/>          
        </td>
    </tr>
  )
}
