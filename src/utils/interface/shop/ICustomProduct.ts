import IItemOrder from "./IItemOrder"
import { IFirstLevelId, ISecondLevelId, IThirdLevelId } from "./ILevel"
import IProduct from "./IProduct"

interface ICustomProduct {
    id: string
    firstLevelId: string
    secondLevelId: string
    thirdLevelId: string
    productId: string
    itemOrderId: string

    product: IProduct
    firstLevel: IFirstLevelId
    secondLevel: ISecondLevelId
    thirdLevel: IThirdLevelId
    itemOrder: IItemOrder
}

export default ICustomProduct;