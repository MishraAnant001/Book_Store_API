import * as yup from "yup"

export const userSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required().min(8).max(16)
})

export const authorSchema = yup.object().shape({
    name: yup.string().required(),
    biography: yup.string().required(),
    nationality: yup.string().required()
})

export const bookSchema = yup.object().shape({
    title: yup.string().required(),
    author: yup.string().required(),
    category: yup.string().required(),
    ISBN: yup.string().required().matches(/\b(?:ISBN(?:: ?| ))?((?:97[89])?\d{9}[\dx])\b/i),
    description: yup.string().required(),
    price: yup.number().required().min(1),
})

