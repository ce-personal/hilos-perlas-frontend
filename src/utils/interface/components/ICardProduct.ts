import { ReactNode } from "react";
import IProduct from "../shop/IProduct";

export interface IPropCardProduct {
    product: IProduct
    button: ReactNode
    background: backgroundCardProduct
}

export enum backgroundCardProduct {
    white,
    random
}