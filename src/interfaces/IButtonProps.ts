import { ReactElement } from "react";

export interface IButtonProps {
    children: ReactElement,
    isLoading: boolean,
    buttonType: string,
    others: unknown
}