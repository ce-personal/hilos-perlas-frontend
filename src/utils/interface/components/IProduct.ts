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





// Customizer
export interface IPropStepCustomizer {
    changeListPartSelected: Function
    completed: object
} 
export interface IStateStepCustomizer {
    activeStep: number,
} 


export interface IPropCustomizer {} 
export interface IStateCustomizer {
    listPart: Array<Array<any>>
    listPartSelected: Array<any>
    listPartSelectedBuy: Array<any>

    completed: {}
    
    stringFile: {
        step0: string,
        step1: string,
        step2: string
    }

    stepSelected: number
} 



export interface IPropCanvasImage {
    step0File: string
    step1File: string
    step2File: string
}



export interface IPiece {
    width: number,
    height: number,
    x: number,
    y: number,
    image: HTMLImageElement

    porcentageRadio: number,
    step: number

    index: number
}
export interface IStateCanvasImage {
    dragIndex: IPiece | null
    listPart: Array<IPiece>
}