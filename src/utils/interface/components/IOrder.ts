import { Dayjs } from "dayjs";
import IClient from "../gen/IClient";
import ILocalShopingCart from "../localstorage/IShopingCart";
import IFile from "../shared/IFile";
import IItemOrder from "../shop/IItemOrder";
import IOrder from "../shop/IOrder";
import Order from "../shop/IOrder";
import IProduct from "../shop/IProduct";

export interface IPropGenerateOrder {

}

export interface IPropTableProductOrder {
    listProduct: Array<{ product: IProduct, files: Array<IFile>, quantityLocal: number }>,
}

export interface IPropGenerateOrderButtonEdit {
    changeQuantity: Function,
    removeProduct: Function,
    product: IProduct,
}

export interface IStateGenerateOrder {
    listProductInLocal: Array<ILocalShopingCart>    
    listProduct: Array<{ product: IProduct, files: Array<IFile>, quantityLocal: number }>,
    urlRedirect: string
}




export interface IStateFinishOrder {
    listProductInLocal: Array<ILocalShopingCart>    
    listProduct: Array<{ product: IProduct, files: Array<IFile>, quantityLocal: number }>,
    value: Dayjs,
    user: IClient,
    marker: { lat: number, lng: number }
}

export interface IStateMapOrderFinish {
    center: number[],
    zoom: number,

    marker: { lat: number, lng: number }
}

export interface IPropMapOrderFinish {
    changeValueMarker: Function,
    lat?: number,
    lng?: number
}















export interface IStateMyOrders {
    listOrders: Array<Order>,
    user: IClient
}

export interface IPropsMyOrders {} 




export interface IStateDetail {
    listProduct: Array<{ product: IProduct, files: Array<IFile>, quantityLocal: number }>,
    order: IOrder
    value: Dayjs,
    user: IClient,
    ubication: { lat: number, lng: number }
}

export interface IPropDetail {}