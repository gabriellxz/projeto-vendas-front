import { z } from "zod";

export const adressSchema = z.object({
    CEP: z
        .string()
        .nonempty("Campo obrigatório")
        .min(8, "CEP inválido"),
    numero: z
        .string()
        .nonempty("Campo obrigatório"),
    complemento: z
        .string()
        .nonempty("Campo obrigatório"),
    ponto_de_referencia: z
        .string()
        .nonempty("Campo obrigatório"),
    bairro: z
        .string()
        .nonempty("Campo obrigatório"),
    estado: z
        .string()
        .nonempty("Campo obrigatório"),
    cidade: z
        .string()
        .nonempty("Campo obrigatório"),
    telefone_contato: z
        .string()
        .nonempty("Campo obrigatório")
        .min(11, "Telefone inválido"),
    Rua: z
        .string()
        .nonempty("Campo obrigatório")
})