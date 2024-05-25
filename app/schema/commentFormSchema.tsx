import * as yup from "yup"

export const validationSchema = yup.object().shape({
    pseudo: yup.string().trim().required('Un pseudonyme est requis'),
    comment: yup.string().trim().required('Un commentaire est requis'),
})

export const validationUpdateSchema = yup.object().shape({
    isValid: yup.string().required("Veuillez sélectionner une valeur").oneOf(["true", "false"], "La valeur sélectionnée n'est pas valide"),
});