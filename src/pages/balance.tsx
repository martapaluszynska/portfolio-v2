import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Hero } from '../components/Hero';
import { BalanceImage } from '../components/images/BalanceImage';
import { Layout } from '../components/Layout';
import BALANCE_PAGE from '../data/balance.json';
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
            <Hero name="Balance" tagline={BALANCE_PAGE.header.text} style={'is-seconadry'} image={<BalanceImage />}>
                <TextBouble text={BALANCE_PAGE.header.cta} top="30%" left="75%" />
            </Hero>
        </Layout>
    );
};
