import * as yup from "yup";

export const contactsValidationSchema = yup.object().shape({
    title: yup.string().trim().required('Un titre est requis'),
    email: yup.string().trim().email('Veuillez entrer une adresse e-mail valide').required('Une adresse e-mail est requise'),
    description: yup.string().trim().required('Une description est requise'),
});

export const contactsUpdateValidationSchema = yup.object().shape({
    statut: yup.string().trim().required('Un statut est requis'),
});
