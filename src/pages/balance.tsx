import { graphql } from 'gatsby';
import * as React from 'react';
import { Hero } from '../components/Hero';
import { BalanceImage } from '../components/images/BalanceImage';
import { Layout } from '../components/Layout';
import '../styles/styles.scss';

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
            <Hero name="Balance" tagline={'test'} style={'is-seconadry'} image={<BalanceImage />}/>
        </Layout>
    );
};
