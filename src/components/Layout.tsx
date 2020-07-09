import { globalHistory as history } from '@reach/router';
import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import favicon from '../../static/icons/favicon.ico';
import { PageContextProvider } from './../Context/GlobalContext';
import Navbar from './Navbar';

import '../styles/styles.scss';

interface IProps {
    mainElementClass?: string;
}

const pageObject = {
    about: {
        class: 'bg--green',
        color: {
            primary: '#0E3239',
        },
    },
    contact: {
        class: 'bg--primary',
        color: {
            primary: '#5d0e2c',
        },
    },
    work: {
        class: 'bg--work',
        color: {
            primary: '#F0F4EB',
        },
    },
    life: {
        class: 'bg--secondary',
        color: {
            primary: '#F0F4EB',
        },
    },
    balance: {
        class: 'bg--secondary',
        color: {
            primary: '#F0F4EB',
        },
    },
};

export const Layout: React.FC<IProps> = ({ mainElementClass, children }) => {
    return (
        <>
            <StaticQuery
                query={graphql`
                query NavbarQuery {
                    site {
                        siteMetadata {
                            name
                            tagline
                            navbarLinks {
                                name
                                link
                            }
                        }
                    }
                }
            `}
                // tslint:disable-next-line: jsx-no-lambda
                render={({ site: { siteMetadata: { navbarLinks, name, tagline } } }) => {

                    const { location } = history;

                    const currentPageObject = () => {
                        // Returning single object from main links list
                        const currentPage = navbarLinks.filter(
                            (linkObject: {name: string; link: string}) => linkObject?.name === (location.pathname.length === 1 ? 'about' : location.pathname.substring(1)),
                        )[0];
                        return (pageObject as { [T: string]: any })[currentPage?.name];
                    };

                    const siteTitle = `${name}${tagline}`;

                    const currentPageColor = `${currentPageObject()?.color.primary}`;
                    return (
                        <>
                            <PageContextProvider>
                                <Helmet
                                    bodyAttributes={{
                                        class: currentPageObject()?.class,
                                    }}
                                >
                                    <title>{siteTitle}</title>
                                    <link rel="icon" href={favicon} />
                                    {/* <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
                                    <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
                                    <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
                                    <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
                                    <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
                                    <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
                                    <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
                                    <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
                                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
                                    <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
                                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                                    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
                                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                                    <link rel="manifest" href="/manifest.json" />
                                    <meta name="msapplication-TileColor" content="#ffffff" />
                                    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" /> */}
                                    {/* SOCIAL */}{/* FB */}
                                    <meta property="og:title" content={siteTitle} />
                                    <meta property="og:description" content="{}" />
                                    <meta property="og:image" content="{}" />
                                    <meta property="og:url" content="http://martapaluszynska.github.io" />
                                    {/* TWITTER */}
                                    <meta name="twitter:title" content={name} />
                                    <meta name="twitter:description" content="{}" />
                                    <meta name="twitter:image" content="{}" />
                                    {/* <meta name="twitter:card" content={} /> */}
                                    {/* END_SOCIAL */}
                                    <meta name="theme-color" content={currentPageColor} />
                                    <meta name="msapplication-navbutton-color" content={currentPageColor} />
                                    <meta name="apple-mobile-web-app-capable" content="yes" />
                                    <meta name="apple-mobile-web-app-status-bar-style" content={currentPageColor} />
                                </Helmet>
                                <header>
                                    <Navbar siteTitle={name} menuLinks={navbarLinks} />
                                </header>
                                <main
                                    className={`${mainElementClass}`}
                                    style={{
                                        overflow: 'hidden',
                                        position: 'relative',
                                    }}
                                >
                                    {children}
                                    {/* <Dots /> */}
                                </main>
                            </PageContextProvider>
                        </>
                    );
                }}
            />
        </>
    );
};
