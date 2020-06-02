import { graphql } from 'gatsby';
import * as React from 'react';
import { Hero } from '../components/Hero';
import { LifeImage } from '../components/images/LifeImage';
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
            <Hero name="Life" tagline={'test'} image={<LifeImage />} />
        </Layout>
    );
};
