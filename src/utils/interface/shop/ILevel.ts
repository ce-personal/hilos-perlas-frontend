import ICategory from "../gen/ICategory"

interface ILevel {
    id: string
    name: string
    description: string
    categoryId: string

    category: ICategory
}

export interface IFirstLevelId extends ILevel {};
export interface ISecondLevelId extends ILevel {};
export interface IThirdLevelId extends ILevel {};