import { ReactNode } from "react";
import IClient from "../gen/IClient";

export interface IPropHeader {

}

export interface IStateHeader {
    user: IClient,
    menu: {
        open: boolean,
        anchorEl: HTMLElement
    }
}