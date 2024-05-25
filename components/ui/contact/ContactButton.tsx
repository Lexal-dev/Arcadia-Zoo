import useModal from "@/app/hooks/useModal";
import { MdAddCircleOutline } from "react-icons/md";
import ContactsFormModal from"@/components/ui/contact/ContactFormModal";
import { ContactsProvider } from "@/app/context/ContactsContext";

export default function Contact() {
  const {onOpen, openModal, onClose} = useModal()

  return (
    <ContactsProvider>
        <ContactsFormModal onOpen={onOpen} onClose={onClose} openModal={openModal}/>
        <button onClick={onOpen} className="p-2 rounded-lg hover:bg-green-200 text-gray-800 mb-5 flex items-center gap-2 text-xl">
          <MdAddCircleOutline />
          <span>Demande de contact</span>
        </button>
    </ContactsProvider>
  );
}