import { MdAddCircleOutline } from "react-icons/md";
import useModal from "@/app/hooks/useModal";
import CommentFormModal from "@/components/ui/comment/CommentFormModal";

export default function Comment() {

  const {onOpen, openModal, onClose} = useModal()

  return (
    <>
      <CommentFormModal onOpen={onOpen} onClose={onClose} openModal={openModal}/>
      <button onClick={onOpen} className="p-2 rounded-lg hover:bg-green-200 text-gray-800 mb-5 flex items-center gap-2 text-xl">
        <MdAddCircleOutline />
        <span>Laissez un commentaire</span>
      </button>
    </>
  );
}