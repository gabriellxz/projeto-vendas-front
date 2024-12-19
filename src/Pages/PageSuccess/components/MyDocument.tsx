import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer"
import Moeda from "../../../utils/moeda"
import { CompleteOrder } from "../typePayment"
import logo_yeshua from "../../../assets/yeshuaPNG.png"

interface PropsPDF {
    orderPDF?: CompleteOrder
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
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    label: {
        fontWeight: "bold",
    },
    value: {
        flex: 1,
        textAlign: "right",
    },
    productsContainer: {
        marginTop: 10,
    },
    productCard: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 10,
    },
    productRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 3,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    viewHeader: {
        display: "flex"
    }
});

export default function MyDocument({ orderPDF }: PropsPDF) {

    const totalPrice = orderPDF?.OrderItem.reduce(
        (sum, item) => sum + item.quantidade * item.preco,
        0
    );

    const formatDate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Date(date).toLocaleDateString("pt-BR", options);
    };

    return (
        <Document>
            <Page size="A4" style={styles.container}>

                <View style={styles.viewHeader}>
                    <Text style={styles.header}>Recibo de compra</Text>
                    <View style={styles.image}>
                        <Image src={logo_yeshua} />
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Pedido Nº:</Text>
                        <Text style={styles.value}>{orderPDF?.id_order}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Data do Pedido:</Text>
                        <Text style={styles.value}>
                            {orderPDF?.createdAt ? formatDate(orderPDF.createdAt) : ""}
                        </Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Cliente:</Text>
                        <Text style={styles.value}>{orderPDF?.users.nome}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Total:</Text>
                        <Text style={styles.value}>
                            {Moeda.formatar(totalPrice || 0)}
                        </Text>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Endereço de Entrega:</Text>
                    <Text>{`${orderPDF?.adress.Rua}, ${orderPDF?.adress.numero}, ${orderPDF?.adress.bairro}, ${orderPDF?.adress.cidade} - ${orderPDF?.adress.estado}, ${orderPDF?.adress.CEP}`}</Text>
                    {orderPDF?.adress.complemento && (
                        <Text>Complemento: {orderPDF.adress.complemento}</Text>
                    )}
                    {orderPDF?.adress.ponto_de_referencia && (
                        <Text>
                            Ponto de Referência: {orderPDF.adress.ponto_de_referencia}
                        </Text>
                    )}
                </View>

                <View style={styles.productsContainer}>
                    {orderPDF?.OrderItem.map((item, index) => (
                        <View key={index} style={styles.productCard}>
                            <View style={styles.productRow}>
                                <Text style={styles.label}>Produto:</Text>
                                <Text style={styles.value}>
                                    {item.produto.nome_produto}
                                </Text>
                            </View>
                            <View style={styles.productRow}>
                                <Text style={styles.label}>Quantidade:</Text>
                                <Text style={styles.value}>{item.quantidade}</Text>
                            </View>
                            <View style={styles.productRow}>
                                <Text style={styles.label}>Preço Unitário:</Text>
                                <Text style={styles.value}>
                                    {Moeda.formatar(item.preco)}
                                </Text>
                            </View>
                            <View style={styles.productRow}>
                                <Text style={styles.label}>Subtotal:</Text>
                                <Text style={styles.value}>
                                    {Moeda.formatar(item.quantidade * item.preco)}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
}