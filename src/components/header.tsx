import * as React from "react"
import { graphql, Link, PageProps } from "gatsby"
import '../styles/styles.scss'
import MainMenu from "./mainMenu";
import LogoDark from "../assets/svg/logo-dark.svg"


export interface HeaderProps {
    displayLogo: boolean;
    menu: Array<any>;
}



const Header: React.FC<HeaderProps> = ( { displayLogo, menu} ) => {

    if (displayLogo) {
        return (
            <React.Fragment>
                <section className="logo-header">
                    <Link to="/"><LogoDark/></Link>
                    <MainMenu menu={menu}/>
                </section>
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
