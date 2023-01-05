import { ReactNode } from "react";

export interface IPropHeader {

}

export interface IStateHeader {
    manager: {
        open: boolean,
        title: string,
        content: ReactNode
    },
}