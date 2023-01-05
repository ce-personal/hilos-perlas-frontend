import ICategory from "../gen/ICategory"

export interface IPropFooter {

}

export interface IStateFooter {
    ourService: string[]
    categoryProduct: ICategory[]
    aboutUs: { name: string, url: string }[]
    contact: { name: string, url: string }[]
}