import { graphql } from 'gatsby';
import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import '../styles/styles.scss';

import styles from './contact.module.scss';
import FormField from '../components/Form/FormField';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../utils/fontawesome.js'

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

const InitialState = [
    {
        required: true,
        name: "name",
        label: "name",
        value: "",
        errors: [],
    },
    {
        required: true,
        name: "email",
        label: "e-mail",
        value: "",
        errors: [],
    },
    {
        required: true,
        name: "message",
        label: "message",
        value: "",
        errors: [],
    },
]

export default (props: ContactPageProps) => {

    const [formFields, setFormFields] = useState(InitialState)

    useEffect(() => {
        console.log(formFields);
    }, [formFields])

    const handleTextInputChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;

        const newForm = [...formFields]
        newForm[index].value = value

        setFormFields(newForm);
    }

    return (
        <Layout mainElementClass="page--contact">
            <section className={`hero is-bold is-fullheight ${styles.heroContact}`}>
                <div className="container contactContainer">
                    <div className="columns contactColumns">
                        <div className="column contactColumn">
                            <h1 className="title">Contact</h1>
                            <p className="subtitle">Feel free to get in touch with me</p>

                            <div className="socialIcons">
                                <div className="socialIcon">
                                <FontAwesomeIcon icon="coffee" />
                                </div>
                                <div className="socialIcon">
                                <FontAwesomeIcon icon="coffee" />
                                </div>
                            </div>

                            <form>
                                {Boolean(formFields.length) && formFields.map((field, index: number) => (
                                    <FormField
                                        required={field.required}
                                        error={Boolean(field.errors.length)}
                                        key={field.name}
                                        label={field.label}
                                        name={field.name}
                                        value={field.value}
                                        onChange={handleTextInputChange(index)}
                                        helpText={
                                            field.errors[0]
                                        }
                                    />
                                ))}
                                <div className="field is-grouped is-grouped-right">
                                    <p className="control">
                                        <a className="button is-secondary" type="submit">
                                            Submit
                                        </a>
                                    </p>
                                </div>
                            </form>
                            <div className="contactInfo">
                                {`or\npaluszynska.marta@gmail.com\n+48 692 208 062`}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout >
    );
};
