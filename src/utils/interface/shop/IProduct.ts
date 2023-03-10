import ICategory from "../gen/ICategory"
import IUserAdmin from "../gen/IUserAdmin"
import IFile from "../shared/IFile"
import IScore from "../shared/IScore"
import ICustomProduct from "./ICustomProduct"

interface IProduct {
    id: string

    name: string
    description: string
    price: number
    quantity: number
    recordId: string
    date: Date
    categoryId: string
    customProductId: string

    
    record?: IUserAdmin
    category?: ICategory
    customProduct?: ICustomProduct

    files?: IFile[]
    listScore?: IScore[]
}

export default IProduct;