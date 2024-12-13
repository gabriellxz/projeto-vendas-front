import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer"
import Pedidos from "../../../types/pedidos"
import { CartOrderUser } from "../../../types/cart"
import Moeda from "../../../utils/moeda"

interface PropsPDF {
    orderPDF?: Pedidos
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        fontSize: 12,
    },
    header: {
        textAlign: "center",
        marginBottom: 20,
        fontSize: 18,
        fontWeight: "bold",
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#D1FAE5",
        padding: 10,
        borderRadius: 5,
    },
    infoText: {
        fontSize: 12,
    },
    productsContainer: {
        marginTop: 20,
    },
    productCard: {
        flexDirection: "row",
        marginBottom: 20,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    productDetails: {
        flex: 1,
    },
    productRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    productLabel: {
        fontWeight: "bold",
    },
    productValue: {
        borderWidth: 1,
        borderColor: "#6B7280",
        borderRadius: 5,
        padding: 5,
    },
});

export default function MyDocument(props: PropsPDF) {

    const items = props.orderPDF?.carrinho.carrinho.carrinho

    const totalAmount = items?.reduce((total, item) => total + item.amount, 0)
    const precoTotal = items?.reduce((total, item) => total + (item.amount * item.produtos.preco), 0)

    return (
        <Document>
            <Page size="A4">
                <View>
                    <Text>Recibo Yeshuá</Text>

                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>
                            Quantidade de produtos: {totalAmount}
                        </Text>
                        <Text style={[styles.infoText, { fontWeight: "bold" }]}>
                            Total: {Moeda.formatar(precoTotal || 0)}
                        </Text>
                    </View>

                    {/* Lista de produtos */}
                    <View style={styles.productsContainer}>
                        {items?.map((p: CartOrderUser, index) => (
                            <View key={index} style={styles.productCard}>
                                <Image
                                    style={styles.productImage}
                                    src={p.produtos.imagem && p.produtos.imagem[0] && p.produtos.imagem[0].url}
                                />
                                <View style={styles.productDetails}>
                                    <View style={styles.productRow}>
                                        <Text style={styles.productLabel}>Produto:</Text>
                                        <Text style={styles.productValue}>
                                            {p.produtos.nome_produto}
                                        </Text>
                                    </View>
                                    <View style={styles.productRow}>
                                        <Text style={styles.productLabel}>Quantidade:</Text>
                                        <Text style={styles.productValue}>{p.amount}</Text>
                                    </View>
                                    <View style={styles.productRow}>
                                        <Text style={styles.productLabel}>Nº do pedido:</Text>
                                        <Text style={styles.productValue}>
                                            {props.orderPDF?.id_order}
                                        </Text>
                                    </View>
                                    <View style={styles.productRow}>
                                        <Text style={styles.productLabel}>Preço:</Text>
                                        <Text style={styles.productValue}>
                                            {Moeda.formatar(p.produtos.preco)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    )
}