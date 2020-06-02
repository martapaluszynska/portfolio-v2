import { graphql, StaticQuery } from 'gatsby';
import React, { ReactNode } from 'react';
import { NavigationArrows } from './components';
import Navbar from './Navbar';
import { PageContextProvider } from './../Context/GlobalContext';

interface IProps {
    mainElementClass?: string;
}

export const Layout: React.FC<IProps> = ({ mainElementClass, children }) => (

    <StaticQuery
        query={graphql`
            query NavbarQuery {
                site {
                    siteMetadata {
                        name
                        navbarLinks {
                            name
                            link
                        }
                    }
                }
            }
        `}
        // tslint:disable-next-line: jsx-no-lambda
        render={({ site: { siteMetadata: { navbarLinks, name } } }) => (
            <>
                <PageContextProvider>
                    <header>
                        <Navbar siteTitle={name} menuLinks={navbarLinks} />
                    </header>
                    <main className={mainElementClass}>
                        {children}
                    </main>
                    <NavigationArrows />
                </PageContextProvider>
            </>
        )}
    />
);
