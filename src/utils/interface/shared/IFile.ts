import IUserAdmin from "../gen/IUserAdmin"
import { IFirstLevelId, ISecondLevelId, IThirdLevelId } from "../shop/ILevel"
import IProduct from "../shop/IProduct"

interface IFile {
    id: string
    stringFile: string
    date: Date
    recordId: string
    productId: string
    firstLevelId: string
    secondLevelId: string
    thirdLevelId: string
    IsItMainFile: boolean


    record: IUserAdmin
    product: IProduct
    firstLevel: IFirstLevelId
    secondLevel: ISecondLevelId
    thirdLevel: IThirdLevelId
}

export default IFile;