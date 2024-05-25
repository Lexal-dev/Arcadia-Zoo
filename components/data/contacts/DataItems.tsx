import { ContactsDataType } from "@/app/types/useTypes";
import { FaPen, FaTrash  } from "react-icons/fa";
import useModal from "@/app/hooks/useModal";
import ContactFormModal from "@/components/ui/contact/ContactFormModal";
import { useFirebase } from "@/app/context/ContactsContext";

export default function DataItems({contact} : {contact: ContactsDataType}){
    const {deleteContacts} = useFirebase();
    
    const formattedCreatedDate = contact.createdAt.toLocaleDateString('fr-FR', {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })

    const formattedUpdatedDate = contact.createdAt.toLocaleDateString('fr-FR', {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })

    const {onOpen, onClose, openModal} = useModal()

    return(
        <tr>
            <td className="p-3 text-sm border">{contact.id}</td>
            <td className="p-3 text-sm border">{contact.title}</td>
            <td className="p-3 text-sm border">{contact.email}</td>
            <td className="p-3 text-sm border">{contact.description}</td>
            <td className="p-3 text-sm border">{contact.statut}</td>
            <td className="p-3 text-sm border">{formattedCreatedDate}</td>
            <td className="p-3 text-sm border">{formattedUpdatedDate}</td>
            <td className="p-3 text-sm border">
                <div className="flex items-center gap-5">
                    <button onClick={onOpen} className="flex items-center justify-center p-2 rounded-md text-white bg-yellow-500 hover:bg-yellow-600">
                    <FaPen />
                    </button>
                    <button onClick={() => contact.id && deleteContacts(contact.id)} className="flex items-center justify-center p-2 rounded-md text-white bg-red-500 hover:bg-red-600">
                    <FaTrash />
                    </button>
                </div>
                <ContactFormModal isUpdate openModal={openModal} onClose={onClose} contact={contact}/> 
            </td>
        </tr>
    )
}