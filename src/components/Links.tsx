import { Location } from '@reach/router';
import { Link } from 'gatsby';
import React from 'react';
import { usePageContext } from '../Context/GlobalContext';
import useSiteMetadata from '../Hooks/useSiteMetadata';
import styles from './Links.module.scss';

interface ILink {
    name: string;
    link: string;
}

interface IProps {
    links: ILink[];
}

export const Links: React.FC<IProps> = ({ links }) => {

    const pageData = usePageContext();
    const { name: siteName } = useSiteMetadata();

    return (
        <div className={`${styles.linksWrapper}`}>
            <Location>
                {({location}) => {
                    if (/contact/.test(location.pathname)) {
                        return;
                    }
                    return (
                        <ul
                            className={`
                                ${styles.links}
                                ${location.pathname === '/' || /contact/.test(location.pathname)
                                    ? `${styles.inverse}`
                                    : ''
                                }`
                            }
                        >
                            {links.map(({ name, link }) => (
                                <li key={name}>
                                    <Link
                                        className={`${styles.linkText}`}
                                        to={link}
                                        activeClassName={`${styles.active}`}
                                    >
                                        {name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    );
                }}
            </Location>
        </div>
    );
};
