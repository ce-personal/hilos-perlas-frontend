import { ReactPortal } from "react";
import IFile from "../shared/IFile";
import IProduct from "../shop/IProduct";

export interface IPropBestColletion {
    title?: string
};

export interface IStateBestColletion {
    listProduct: Array<{ product: IProduct, files: Array<IFile> }>,
    mainProduct: IProduct,
    mainFile: string,
    dom: ReactPortal
}