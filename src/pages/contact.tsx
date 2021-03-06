
import React from 'react';
import { Helmet } from 'react-helmet';
import { Layout } from '../components/Layout';
import ContactForm from './contactForm';

interface ContactPageProps {
    data: {
        site: {
            siteMetadata: {
                name: string;
                tagline: string;
            },
        },
    };
}

export default (props: ContactPageProps) => {

    return (
        <Layout mainElementClass="page--contact">
            <ContactForm />
        </Layout >
    );
};
