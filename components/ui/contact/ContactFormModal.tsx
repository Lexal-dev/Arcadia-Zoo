import { IoClose } from "react-icons/io5";
import { ModalType, ContactsFormType } from "@/app/types/useTypes";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactsValidationSchema } from "@/app/schema/contactFormSchema";
import { useEffect } from "react";
import { useFirebase } from "@/app/context/ContactsContext";
import { CommentsProvider } from "@/app/context/commentsContext";

export default function ContactFormModal({ onClose, openModal, isUpdate, contact }: ModalType) {
    const { addContacts, updateContacts } = useFirebase();

    const { handleSubmit, register, reset, formState: { errors } } = useForm<ContactsFormType>({
        resolver: yupResolver(contactsValidationSchema) as any,
    });

    useEffect(() => {
        if (isUpdate && contact) {
            reset(contact);
        }
    }, [isUpdate, contact, reset]);

    const onSubmit: SubmitHandler<ContactsFormType> = async (formData) => {
        try {
            if (isUpdate && contact) {
                await updateContacts({
                    id: contact.id,
                    statut: formData.statut,
                    updatedAt: new Date(),
                });
            } else {
                await addContacts({
                    title: formData.title,
                    email: formData.email,
                    description: formData.description,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    statut: "En attente",
                });
            }
            onClose();
        } catch (error) {
            console.error("Erreur lors de l'ajout ou de la modification du contact", error);
        }
    };

    return (
        <CommentsProvider>
            {openModal && (
                <div className="absolute top-0 left-0 z-40 grid h-screen w-full place-items-center backdrop-blur">
                    <div className="max-x-[700px] relative z-50 m-auto min-h-[200px] bg-white p-4 shadow-lg border border-gray-800 rounded-md">
                        <div className="flex justify-end">
                            <IoClose className="self-end, text-2xl cursor-pointer" onClick={onClose} />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                            <label htmlFor="title">Titre:</label>
                            <input
                                {...register("title")}
                                id="title"
                                className="border border-gray-300 p-2 rounded-md"
                                readOnly={isUpdate}
                            />
                            {errors.title && <span className="text-red-500">{errors.title.message}</span>}
            
                            <label htmlFor="email">Adresse e-mail:</label>
                            <input
                                {...register("email")}
                                id="email"
                                type="email"
                                className="border border-gray-300 p-2 rounded-md"
                                readOnly={isUpdate}
                            />
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            
                            <label htmlFor="description">Description:</label>
                            <input
                                {...register("description")}
                                id="description"
                                className="border border-gray-300 p-2 rounded-md"
                                readOnly={isUpdate}
                            />
                            {errors.description && <span className="text-red-500">{errors.description.message}</span>}
            
                            
                            {isUpdate && (
                                <div>
                                    <label htmlFor="statut">Statut:</label>
                                    <select {...register("statut")} id="statut" className="border border-gray-300 p-2 rounded-md">
                                        <option value="En attente">En attente</option>
                                        <option value="En cours">En cours</option>
                                        <option value="Terminé">Terminé</option>
                                    </select>
                                </div>
                            )}

                            <button type="submit" className="text-white bg-gray-700 hover:bg-gray-900 rounded-md p-3">
                                {isUpdate ? "Modifier" : "Demande de contact"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </CommentsProvider>
    );
}