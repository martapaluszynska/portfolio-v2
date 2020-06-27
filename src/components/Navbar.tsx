import { Location } from '@reach/router';
import { Link } from 'gatsby';
import React, { useState } from 'react';
import { NavbarLink } from '../models/site';
import { Links } from './Links';
import './Navbar.scss';

interface NavbarProps {
    siteTitle: string;
    menuLinks: NavbarLink[];
}

const links = [
    'work',
    'life',
    'balance',
];

const Navbar = (props: NavbarProps) => {
    const home = props.menuLinks.filter((link) => link.name === 'about')[0].link;
    const navigation = props.menuLinks.filter((link) => link.name !== 'about' && link.name !== '404');
    const dotsNavigation = props.menuLinks.filter((link) => links.includes(link.name));

    const [open, setOpen] = useState(false);

    const toggleNavbar = (event: any) => {
        setOpen(!open);
    };

    return (
        <Location>
            {({ location }) => (
                <>
                    <nav
                        className={`
                            navbar
                            is-fixed-top
                            ${location.pathname === '/' || /contact/.test(location.pathname)
                                ? 'is-primary is-transparent'
                                : ''
                            }
                            ${location.pathname === '/'
                                ? 'is-index'
                                : ''
                            }`
                        }
                        style={{
                            zIndex: 1,
                            right: 'initial'
                        }}
                        role="navigation"
                        aria-label="main navigation"
                    >

                        <div className="navbar-brand navbar-start">
                            <Link
                                className={`navbar-item`}
                                to={home}
                            >
                                {props.siteTitle}
                            </Link>
                        </div>
                    </nav>
                    <nav
                        className={`
                            navbar
                            is-fixed-top
                            navbar--main
                            ${location.pathname === '/' || /contact/.test(location.pathname)
                                ? 'is-primary is-transparent'
                                : ''
                            }
                            ${location.pathname === '/'
                                ? 'is-index'
                                : ''
                            }`
                        }
                        style={{
                            left: 'initial'
                        }}
                        role="navigation"
                        aria-label="main navigation"
                    >
                        <a
                            role="button"
                            className={`
                                navbar-burger
                                burger
                                ${open ? 'is-active' : ''}
                            `}
                            aria-label="menu"
                            aria-expanded="false"
                            data-target="navbarMenu"
                            onClick={toggleNavbar}
                        >
                            <span aria-hidden="true" />
                            <span aria-hidden="true" />
                            <span aria-hidden="true" />
                        </a>
                        <div
                            id="navbarMenu"
                            className={`
                                navbar-menu
                                ${open ? 'is-active' : ''}
                            `}
                        >
                            <div className="navbar-end">
                                {navigation.map(({ link, name }: NavbarLink, index: number) => (
                                    <Link
                                        className="navbar-item navbar__item"
                                        key={index}
                                        to={link}
                                        activeClassName="active"
                                        onClick={toggleNavbar}
                                    >
                                        {name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </nav>
                    <Links links={dotsNavigation} />
                </>
            )}
        </Location>
    );
};

export default Navbar;
