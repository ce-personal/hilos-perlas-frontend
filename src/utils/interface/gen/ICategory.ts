import IUserAdmin from "./IUserAdmin"

interface ICategory {
    id: string
    name: string
    description: string
    date?: Date
    recordId: string

    record?: IUserAdmin
}

export default ICategory;