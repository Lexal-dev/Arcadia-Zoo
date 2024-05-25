//Modal Type :
export type ModalType = {
    openModal: boolean;
    onClose: () => void;
    onOpen?: () => void;
    isUpdate?: boolean;
    comment?: any;
    contact?: any;
}

//Comments Type :

export type CommentsDataType = {
    id?: string;
    pseudo: string;
    comment: string;
    createdAt: Date; 
    isValid: boolean;
}

export type CommentsFormType = {
    
    pseudo: string;
    comment: string;
    isValid?: boolean;
    
}

export type CommentsFormUpdateType = {
    id: string;
    isValid: boolean;
}

export type DbCommentsContextType = {
    comments: CommentsDataType[];
    addComments:(commentsData: Omit<CommentsDataType, "id">) => Promise<void>;
    updateComments:(comment: CommentsFormUpdateType) => Promise<void>;
    deleteComments:(id: string) => Promise<void>;
}

// Contact Type:

export type ContactsDataType = {
    id: string;
    title: string;
    email: string;
    description: string;
    statut: string;
    createdAt: Date;
    updatedAt: Date;
}

export type ContactsFormType = {
    title: string;
    email: string;
    description: string;
    statut: "En attente" | "En cours" | "Terminé";
    createdAt?: Date;
    updatedAt?: Date;
}

export type ContactsFormUpdateType = {
    id: string;
    statut: "En attente" | "En cours" | "Terminé";
    updatedAt: Date;
}


export type DbContactsContextType = {
    contacts: ContactsDataType[];
    addContacts:(contactsData: Omit<ContactsDataType, "id">) => Promise<void>;
    updateContacts:(contact: ContactsFormUpdateType) => Promise<void>;
    deleteContacts:(id: string) => Promise<void>;
}