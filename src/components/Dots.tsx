import { useLocation } from '@reach/router';
import { Link } from 'gatsby';
import React from 'react';
import useSiteMetadata from './../Hooks/useSiteMetadata';
import styles from './Dots.module.scss';

const activeLinks = [
    'about',
    'work',
    'life',
    'balance',
    'contact',
];

const primaryPages = [
    // 'about',
    // 'work',
    'life',
    'balance',
    // 'contact',
];

const Dots = () => {

    const location = useLocation();
    const metaData = useSiteMetadata();
    const links = (metaData.navbarLinks as Array<{ name: string; link: string }>).filter((link) => activeLinks.includes(link.name));

    return (
        <div className={`${styles.dots__wrapper}`}>
            <div className={`${styles.dots}`}>
                {links?.map(({ link }, i) => (
                    <Link
                        key={i}
                        to={link}
                        className={`
                            ${styles.dot}
                            ${primaryPages.includes(metaData.navbarLinks.filter((item: { name: string; link: string }) => item.link === location.pathname)[0].name) ?
                                styles.primary
                                :
                                ''
                            }
                        `}
                        activeClassName={`${styles.active}`}
                    />
                ))}
            </div>
        </div>

    );
};

export default Dots;
