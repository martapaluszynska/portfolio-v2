
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
            <Helmet
                bodyAttributes={{
                    class: 'bg--primary',
                }}
            >
                <meta name="theme-color" content="#5d0e2c" />
                <meta name="msapplication-navbutton-color" content="#5d0e2c" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="#5d0e2c" />
            </Helmet>
            <ContactForm />
        </Layout >
    );
};
