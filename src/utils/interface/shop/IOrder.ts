import IClient from "../gen/IClient"

interface Order {
    id: string
    userId: string
    date: Date
    consecutive: number
    name: string
    ubication: string
    deliveryDate: Date
    status: EStatus

    user: IClient
}

export enum EStatus {
    Solicitado,
    Recibido,
    EnProduccion,
    Terminado,
    Entregado
}

export default Order;