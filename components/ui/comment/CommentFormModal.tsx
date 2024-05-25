import { IoClose } from "react-icons/io5";
import { ModalType, CommentsFormType } from "@/app/types/useTypes";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@/app/schema/commentFormSchema";
import { useEffect } from "react";
import { useFirebase } from "@/app/context/commentsContext";

export default function CommentFormModal({ onClose, openModal, isUpdate, comment }: ModalType) {
    const { addComments, updateComments } = useFirebase();

    const { handleSubmit, register, reset, formState: { errors } } = useForm<CommentsFormType>({
        resolver: yupResolver(validationSchema)
    });

    useEffect(() => {
        if (isUpdate && comment) {
            reset(comment);
        }
    }, [isUpdate, comment, reset]);

    const onSubmit: SubmitHandler<CommentsFormType> = async (formData) => {
        try {
            if (isUpdate && comment) {
                await updateComments({
                    id: comment.id,
                    isValid: typeof formData.isValid === "string" ? formData.isValid === "true" : false
                });
            } else {
                await addComments({
                    pseudo: formData.pseudo,
                    comment: formData.comment,
                    createdAt: new Date(),
                    isValid: false
                });
            }

            onClose();
        } catch (error) {
            console.error("Erreur lors de l'ajout ou de la modification du commentaire", error);
        }
    };

    return (
        <>
            {openModal && (
                <div className="absolute top-0 left-0 z-40 grid h-screen w-full place-items-center backdrop-blur">
                    <div className="max-x-[700px] relative z-50 m-auto min-h-[200px] bg-white p-4 shadow-lg border border-gray-800 rounded-md">
                        <div className="flex justify-end">
                            <IoClose className="self-end, text-2xl cursor-pointer" onClick={onClose} />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                            <label htmlFor="pseudo">Pseudonyme:</label>
                            <input
                                {...register("pseudo")}
                                id="pseudo"
                                className="border border-gray-300 p-2 rounded-md"
                                disabled={isUpdate} 
                            />
                            {errors.pseudo && <span className="text-red-500">{errors.pseudo.message}</span>}

                            <label htmlFor="comment">Commentaire:</label>
                            <input
                                {...register("comment")}
                                id="comment"
                                className="border border-gray-300 p-2 rounded-md"
                                disabled={isUpdate} 
                            />
                            {errors.comment && <span className="text-red-500">{errors.comment.message}</span>}

                            {isUpdate && (
                                <>
                                    <label htmlFor="isValid">État de validation:</label>
                                    <select {...register("isValid")} id="isValid" className="border border-gray-300 p-2 rounded-md">
                                        <option value="true">Validé</option>
                                        <option value="false">Non-Validé</option>
                                    </select>
                                </>
                            )}

                            <button type="submit" className="text-white bg-gray-700 hover:bg-gray-900 rounded-md p-3">
                                {isUpdate ? "Modifier" : "Ajouter"} le commentaire
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}