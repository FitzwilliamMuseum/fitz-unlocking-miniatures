import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import '../styles/styles.scss'
import MainMenu from "./mainMenu";
import LogoDark from "../assets/svg/logo-dark.svg"

interface HeaderProps {
    displayLogo: boolean;
}

const Header: React.FC<HeaderProps> = ({ displayLogo }) => {

    const data = useStaticQuery(graphql`
    query HeaderQuery {
        site {
            siteMetadata {
                mainMenu {
                    link
                    title
                }
            }
        }
    }    
  `)

    const menu = data.site.siteMetadata.mainMenu;

    if (displayLogo) {
        return (
            <React.Fragment>
                <section className="logo-header">
                    <Link to="/"><LogoDark /></Link>
                    <MainMenu menu={menu} />
                </section>
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            <MainMenu menu={menu} />
        </React.Fragment>
    )
}

export default Header