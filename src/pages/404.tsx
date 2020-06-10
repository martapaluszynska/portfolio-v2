import { graphql } from 'gatsby';
import * as React from 'react';
import { Layout } from '../components/Layout';
import { Hero } from './../components/Hero';

interface NotFoundPageProps {
    data: {
        site: {
            siteMetadata: {
                name: string;
                tagline: string;
            },
        },
    };
}

export default (props: NotFoundPageProps) => {

    return (
        <Layout>
            {/* <Hero name="404" tagline={'test'} style={'is-seconadry'} image/> */}
        </Layout>
    );
};
