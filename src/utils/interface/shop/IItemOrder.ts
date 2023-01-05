import IProduct from "./IProduct"

interface IItemOrder {
    id: string
    orderId: string
    productId: string
    quantity: number

    product: IProduct
}

export default IItemOrder;