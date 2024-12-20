import { z } from "zod";

export const productSchema = z.object({
    nome_produto: z
        .string()
        .nonempty("Campo obrigatório"),
    preco: z
        .number({
            required_error: "Campo obrigatório"
        })
        .nonnegative({
            message: "Número inválido"
        }),
    descricao: z
        .string()
        .nonempty("Campo obrigatório"),
    diameter: z
        .number({
            required_error: "Campo obrigatório"
        })
        .nonnegative({
            message: "Número inválido"
        }),
    estoque: z
        .number({
            required_error: "Campo obrigatório"
        })
        .nonnegative({
            message: "Número inválido"
        }),
    height: z
        .number({
            required_error: "Campo obrigatório"
        })
        .nonnegative({
            message: "Número inválido"
        }),
    length: z
        .number({
            required_error: "Campo obrigatório"
        })
        .nonnegative({
            message: "Número inválido"
        }),
    oferta: z
        .boolean({
            required_error: "Campo obrigatório"
        }),
    weight: z
        .number({
            required_error: "Campo obrigatório"
        })
        .nonnegative({
            message: "Número inválido"
        }),
    width: z
        .number({
            required_error: "Campo obrigatório"
        })
        .nonnegative({
            message: "Número inválido"
        }),
    categoryId: z
        .number({
            required_error: "Campo obrigatório"
        }),
})