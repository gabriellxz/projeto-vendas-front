import { z } from "zod";

export const registerSchema = z.object({
    nome: z
        .string()
        .nonempty("Campo obrigatório"),
    email: z
        .string()
        .nonempty("Campo obrigatório")
        .email("Email inválido"),
    senha: z
        .string()
        .nonempty("Campo obrigatório")
        .refine(senha => !senha || senha.length > 6, {
            message: "Senha deve conter no mínimo 6 caracteres"
        }),
    CPF: z
        .string()
        .nonempty("Campo obrigatório")
        .refine((CPF) => CPF.length === 11, {
            message: "CPF inválido",
        }),
    Telefone: z
        .string()
        .nonempty("Campo obrigatório")
        .refine((Telefone) => Telefone.length === 11, {
            message: "Telefone inválido",
        }),
    genero: z
        .enum(["feminino", "masculino", "outro"], {
            required_error: "Por favor, selecione um gênero"
        })
})