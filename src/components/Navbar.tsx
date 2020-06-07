import { graphql, Link } from 'gatsby';
import React, { useState } from 'react';
import { NavbarLink } from '../models/site';
import { Dots } from './Dots';
import './Navbar.scss';
import { Location } from '@reach/router';

interface NavbarProps {
    siteTitle: string;
    menuLinks: NavbarLink[];
}

const dotLinks = [
    'work',
    'life',
    'balance',
];

const Navbar = (props: NavbarProps) => {
    const home = props.menuLinks.filter((link) => link.name === 'about')[0].link;
    const navigation = props.menuLinks.filter((link) => link.name !== 'about' && link.name !== '404');
    const dotsNavigation = props.menuLinks.filter((link) => dotLinks.includes(link.name));

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
                            is-spaced
                            ${location.pathname === '/' || /contact/.test(location.pathname)
                                ? 'is-primary is-transparent'
                                : ''
                            }`
                        }
                        role="navigation"
                        aria-label="main navigation"
                    >
                        <div className="navbar-brand">
                            <Link
                                className={`navbar-item`}
                                to={home}
                            >
                                {props.siteTitle}
                            </Link>
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
                        </div>

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
                    <Dots links={dotsNavigation} />
                </>
            )}
        </Location>
    );
};

export default Navbar;
