import z from "zod";

export const userSchema = z.object({
    name: z.string().nonempty("Campo obrigatório"),
    phone: z
        .string()
        .nonempty("Campo obrigatório")
        .refine(phone => !phone || phone.length == 11, {
            message: "Telefone inválido"
        }),
    email: z.string().nonempty("Campo obrigatório"),
    cpf: z
        .string()
        .nonempty("Campo obrigatório")
        .refine(phone => !phone || phone.length == 11, {
            message: "CPF/CNPJ inválido"
        }),
    genero: z.enum(["masculino", "feminino", "outro"], {
        required_error: "Genêro é obrigatório",
    })
}) 