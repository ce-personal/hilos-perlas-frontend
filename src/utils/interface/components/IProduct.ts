import ICategory from "../gen/ICategory";
import IFile from "../shared/IFile";
import IProduct from "../shop/IProduct";

export interface IPropProduct {

}
export interface IStateProduct {
    listProduct: Array<{ product: IProduct, files: Array<IFile> }>
}






export interface IPropProductDetail {}
export interface IStateProductDetail {
    product: { product: IProduct, files: Array<IFile> }
}