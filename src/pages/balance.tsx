import { graphql } from 'gatsby';
import * as React from 'react';
import { Hero } from '../components/Hero';
import { BalanceImage } from '../components/images/BalanceImage';
import { Layout } from '../components/Layout';
import '../styles/styles.scss';
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
            <Hero name="Balance" tagline={BALANCE_PAGE.header.text} style={'is-seconadry'} image={<BalanceImage />}>
                <TextBouble text={BALANCE_PAGE.header.cta} top="30%" left="75%" />
            </Hero>
        </Layout>
    );
};
