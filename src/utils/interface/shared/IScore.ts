import IProduct from "../shop/IProduct";

interface IScore {
    id: string
    productId: string
    value: number

    product: IProduct
}

export default IScore;