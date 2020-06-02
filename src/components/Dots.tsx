import { Link } from 'gatsby';
import React, {useEffect} from 'react';
import './Dots.scss';
import { usePageContext } from './../Context/GlobalContext';
import useSiteMetadata from './../Hooks/useSiteMetadata';
import { Location } from '@reach/router';


interface ILink {
    name: string;
    link: string;
}

interface IProps {
    links: ILink[];
}

export const Dots: React.FC<IProps> = ({ links }) => {


    const pageData = usePageContext()

    const { name } = useSiteMetadata();

    console.log(location);
    

    return (
        <div className="dots-wrapper">
            <Location>
                {({location}) => (
                        <ul className={`dots ${location.pathname === '/' || location.pathname === '/contact' ? 'inverse' : ''}`}>
                            {links.map(({ name, link }) => (
                                <li key={name}>
                                    <Link
                                        className="dot-text"
                                        to={link}
                                        activeClassName="active"
                                    >
                                        {name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                )}
            </Location>
        </div>
    );
};
