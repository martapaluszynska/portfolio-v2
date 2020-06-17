import React from 'react';
import { Helmet } from 'react-helmet';
import { Hero } from '../components/Hero';
import { LifeImage } from '../components/images/LifeImage';
import { Layout } from '../components/Layout';
import LIFE_PAGE from '../data/life.json';
import { TextBouble } from './../components/TextBouble/TextBouble';

interface ScoutsPageProps {
    data: {
        site: {
            siteMetadata: {
                name: string;
                tagline: string;
            },
        },
    };
}

export default (props: ScoutsPageProps) => {

    return (
        <Layout>
            <Helmet
                bodyAttributes={{
                    class: 'bg--secondary',
                }}
            >
                <meta name="theme-color" content="#E4EBDB" />
                <meta name="msapplication-navbutton-color" content="#E4EBDB" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="#E4EBDB" />
            </Helmet>
            <Hero
                name="Life"
                tagline={LIFE_PAGE.header.text}
                image={<LifeImage />}
            >
                <TextBouble flipped={true} text={LIFE_PAGE.header.cta} top="25%" left="20%" />
            </Hero>
        </Layout>
    );
};
