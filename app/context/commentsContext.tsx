"use client"
import { useEffect, useState, createContext, useContext } from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "@/db/firebaseConfig";
import { CommentsFormUpdateType, CommentsDataType, DbCommentsContextType } from "@/app/types/useTypes";
import { toast } from "react-toastify";

const CommentsContext = createContext<DbCommentsContextType | null>(null);

export const useFirebase = () => {
    const context = useContext(CommentsContext);
    if (!context) {
        throw new Error('Erreur lors de la création du context');
    }
    return context;
}

export const CommentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [comments, setComments] = useState<CommentsDataType[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'comments'), (snapshot) => {
            const commentsData: CommentsDataType[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                commentsData.push({
                    id: doc.id,
                    pseudo: data.pseudo,
                    comment: data.comment,
                    createdAt: (data.createdAt as Timestamp).toDate(),
                    isValid: data.isValid
                } as CommentsDataType);
            });
            setComments(commentsData);
        });
        return () => unsubscribe();
    }, [])

    const addComments = async (commentsData: Omit<CommentsDataType, "id">) => {
        try {
            const docRef = await addDoc(collection(db, "comments"), commentsData);
            const newComment: CommentsDataType = {id: docRef.id, ...commentsData};
            setComments([...comments, newComment])
            toast.success('Commentaire envoyé')
        } catch (error:any) {
            console.log("Erreur lors de la création", error)
        }
    }

    const updateComments = async (commentToUpdate: CommentsFormUpdateType) => {
        try {
            if (!commentToUpdate.id) {
                throw new Error("L'identifiant du commentaire à mettre à jour est manquant.");
            }
    
            const commentRef = doc(collection(db, "comments"), commentToUpdate.id);
            await updateDoc(commentRef, { isValid: commentToUpdate.isValid }); 
            
            setComments(prevComments =>
                prevComments.map(comment => {
                    if (comment.id === commentToUpdate.id) {
                        return { ...comment, isValid: commentToUpdate.isValid };
                    }
                    return comment;
                })
            );
    
            toast.success('Commentaire modifié');
        } catch (error) {
            console.log("Erreur lors de la modification", error);
        }
    }

    const deleteComments = async (id:string) => {
        try {
            await deleteDoc(doc(db, "comments", id))
            setComments(comments.filter((comment) => comment.id !== id))
            toast.success("Vous avez bien effacé le commentaire.")
        } catch (error:any) {
            console.error(error.message);
        }
    }
    const value = {
        comments,
        addComments,
        updateComments,
        deleteComments
    }

    return <CommentsContext.Provider value={value}>{children}</CommentsContext.Provider>
}