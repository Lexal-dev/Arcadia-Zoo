import { useState } from "react";
import { ModalType } from "@/app/types/useTypes";

const useModal = () : ModalType => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const onOpen = () => {
        setOpenModal(true)
    }
    const onClose = () => {
        setOpenModal(false)
    }

    return {openModal, onClose, onOpen}
}

export default useModal;