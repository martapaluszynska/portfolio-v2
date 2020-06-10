import { graphql } from 'gatsby';
import * as React from 'react';
import { Hero } from '../components/Hero';
import { Layout } from '../components/Layout';
import INDEX_PAGE from '../data/index.json';

import IndexImage from './../components/images/sections/IndexImage';
import styles from './indexPage.module.scss';

interface IndexPageProps {
    data: {
        site: {
            siteMetadata: {
                name: string;
                tagline: string;
            },
        },
    };
}

export default (props: IndexPageProps) => {

    return (
        <Layout mainElementClass="page--index">
            <section className={`hero is-bold is-fullheight ${styles.heroIndex}`}>
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-vcentered">
                            <div className="column is-centered">
                                <IndexImage />
                            </div>
                            <div className={`column ${styles.columnRelative}`}>
                                <div className={styles.indexText}>
                                    <h1 className="title is-size-4">{INDEX_PAGE.title}</h1>
                                    <p>
                                        {INDEX_PAGE.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};
