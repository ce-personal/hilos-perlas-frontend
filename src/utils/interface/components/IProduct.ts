import ICategory from "../gen/ICategory";
import IProduct from "../shop/IProduct";

export interface IPropProduct {

}

export interface IStateProduct {
    listCategory: ICategory[]
    listProductByCategoryId: IProduct[]
}
