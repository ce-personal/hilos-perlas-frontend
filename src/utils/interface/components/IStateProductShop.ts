import IFile from "../shared/IFile";
import IProduct from "../shop/IProduct";


export interface IPropProductShop  {
    productId: string
}

export interface IStateProductShop {
    product: { product: IProduct, files: IFile[] },
    mainFile: string,
    isToShoppingCart: boolean
}
