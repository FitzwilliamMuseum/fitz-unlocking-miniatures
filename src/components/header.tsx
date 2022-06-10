import * as React from "react"
import { graphql, PageProps } from "gatsby"
import '../styles/styles.scss'
import MainMenu from "./mainMenu";


export interface HeaderProps {
    displayLogo: boolean;
    menu: Array<any>;
}



const Header: React.FC<HeaderProps> = ( { displayLogo, menu} ) => {

    if (displayLogo) {
        return (
            <React.Fragment>
                <MainMenu menu={menu}/>
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            <MainMenu menu={menu}/>
        </React.Fragment>
    )
}

export default Header
