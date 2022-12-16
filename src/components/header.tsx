import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import '../styles/styles.scss'
import MainMenu from "./mainMenu";

interface HeaderProps {
    displayLogo: boolean;
    dark?: boolean
}

const Header: React.FC<HeaderProps> = ({ displayLogo, dark }) => {

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
            <section className={'logo-header' + (dark === true ? ' dark' : '')}>
                <Link to="/">
                    {!!dark && <img className="logo-header--logo" src="/logo.png" />}
                    {!dark && <img className="logo-header--logo" src="/logo-dark.png" />}
                </Link>
                <MainMenu menu={menu} />
            </section>
        )
    }
    return <MainMenu menu={menu} />
}

export default Header