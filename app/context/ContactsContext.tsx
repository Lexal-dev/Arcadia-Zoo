"use client"
import { useEffect, useState, createContext, useContext } from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "@/db/firebaseConfig";
import { ContactsDataType, DbContactsContextType, ContactsFormUpdateType } from "@/app/types/useTypes";
import { toast } from "react-toastify";

const ContactsContext = createContext<DbContactsContextType | null>(null);

export const useFirebase = () => {
    const context = useContext(ContactsContext);
    if (!context) {
        throw new Error('Erreur lors de la création du context');
    }
    return context;
}

export const ContactsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [contacts, setContacts] = useState<ContactsDataType[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'contacts'), (snapshot) => {
            const contactsData: ContactsDataType[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                contactsData.push({
                    id: doc.id,
                    title: data.title,
                    email: data.email,
                    description: data.description,
                    statut: data.statut,
                    createdAt: (data.createdAt as Timestamp).toDate(),
                    updatedAt: (data.createdAt as Timestamp).toDate(),
                } as ContactsDataType);
            });
            setContacts(contactsData);
        });
        return () => unsubscribe();
    }, [])

    const addContacts = async (contactsData: Omit<ContactsDataType, "id">) => {
        try {
            const docRef = await addDoc(collection(db, "contacts"), contactsData);
            const newContact: ContactsDataType = {id: docRef.id, ...contactsData};
            setContacts([...contacts, newContact])
            toast.success('contact envoyé')
        } catch (error:any) {
            console.log("Erreur lors de la création", error)
        }
    }

    const updateContacts = async (contactToUpdate: ContactsFormUpdateType) => {
        try {
            if (!contactToUpdate.id) {
                throw new Error("L'identifiant du contact à mettre à jour est manquant.");
            }
    
            const contactRef = doc(collection(db, "contacts"), contactToUpdate.id);
            await updateDoc(contactRef, { 
                statut: contactToUpdate.statut,
                updatedAt: contactToUpdate.updatedAt
            });
            
            setContacts(prevContacts =>
                prevContacts.map(contact => {
                    if (contact.id === contactToUpdate.id) {
                        return { ...contact, statut: contactToUpdate.statut, updatedAt: contactToUpdate.updatedAt };
                    }
                    return contact;
                })
            );
    
            toast.success('Contact modifié');
        } catch (error) {
            console.log("Erreur lors de la modification", error);
        }
    }

    const deleteContacts = async (id:string) => {
        try {
            await deleteDoc(doc(db, "contacts", id))
            setContacts(contacts.filter((contact) => contact.id !== id))
            toast.success("Vous avez bien effacé le contact.")
        } catch (error:any) {
            console.error(error.message);
        }
    }
    
    const value = {
        contacts,
        addContacts,
        updateContacts,
        deleteContacts
    }

    return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>
}