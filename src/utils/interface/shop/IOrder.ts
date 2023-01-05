import IClient from "../gen/IClient"

interface Order {
    id: string
    userId: string
    date: Date
    ubication: string
    deliveryDate: Date
    status: EStatus

    user: IClient
}

enum EStatus {
    Solicitado,
    Recibido,
    EnProduccion,
    Terminado,
    Entregado
}

export default Order;