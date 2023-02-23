import { ReactNode } from "react";
import IClient from "../gen/IClient";

export interface IPropHeader {
    isDashboard?: boolean
}

export interface IStateHeader {
    user: IClient,
    menu: {
        open: boolean,
        anchorEl: HTMLElement
    }
}