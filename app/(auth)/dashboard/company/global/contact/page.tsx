"use client"
import DataTab from "@/components/data/contacts/DataTab";
import useModal from "@/app/hooks/useModal";
import { MdAddCircleOutline } from "react-icons/md";
import ContactsFormModal from"@/components/ui/contact/ContactFormModal";
import { ContactsProvider } from "@/app/context/ContactsContext";

export default function Contact() {
  const {onOpen, openModal, onClose} = useModal()

  return (
    <ContactsProvider>
      <main className="flex flex-col items-center h-full w-full p-12 gap-6">
        <h1 className="text-4xl font-bold">Contacts:</h1>
        <DataTab />
        <ContactsFormModal onOpen={onOpen} onClose={onClose} openModal={openModal}/>
        <button onClick={onOpen} className="p-2 rounded-md hover:bg-gray-200 text-gray-800 mb-5 flex items-center gap-2">
          <MdAddCircleOutline />
          <span>Demande de contact</span>
        </button>
      </main>
    </ContactsProvider>
  );
}