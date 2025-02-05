import {AppHeader} from "../AppHeader";
import {FC, ReactNode} from "react";

interface ILayoutProps {
    children: ReactNode;
}
export const Layout: FC<ILayoutProps> = ({children}) => {

    return (
        <div>
            <AppHeader/>
            {children}
        </div>
    )
}
