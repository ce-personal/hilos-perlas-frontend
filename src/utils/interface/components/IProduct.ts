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

    completed: {}
    
    stringFile: {
        step0: "",
        step1: "",
        step2: ""
    }

    stepSelected: number
} 



export interface IPropCanvasImage {
    step0File: string
    step1File: string
    step2File: string
}
export interface IStateCanvasImage {
    dragIndex: number

    start: {
        1: {
            width: number,
            height: number,
            positionX: number,
            positionY: number
        },
        2: {
            width: number,
            height: number,
            positionX: number,
            positionY: number
        },
    },

    step0: {
        x: number,
        y: number,

        width: number,
        height: number,
        porcentageRadio: number,

        image: any
    }
}