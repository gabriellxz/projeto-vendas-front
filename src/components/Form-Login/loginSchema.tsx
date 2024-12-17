import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .nonempty("Campo obrigatório")
        .email("Email inválido"),
    senha: z
        .string()
        .nonempty("Campo obrigatório")
        .min(6, "A senha deve conter pelo menos 6 caracteres")
})