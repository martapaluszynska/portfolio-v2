import React, { useState } from 'react';
import styles from './contact.module.scss';
import FormField from '../components/Form/FormField';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

import '../utils/fontawesome.js';

const InitialState = [
    {
        required: true,
        name: 'name',
        label: 'name',
        value: '',
        errors: [],
    },
    {
        required: true,
        name: 'email',
        label: 'e-mail',
        value: '',
        errors: [],
    },
    {
        required: true,
        name: 'message',
        label: 'message',
        value: '',
        errors: [],
    },
];

const ContactForm = () => {
    const [formFields, setFormFields] = useState(InitialState);

    const handleTextInputChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;

        const newForm = [...formFields];
        newForm[index].value = value;

        setFormFields(newForm);
    };
    return (
        <section className={`hero is-bold is-fullheight ${styles.heroContact}`}>
            <div className={`container ${styles.contact__container} `}>
                <div className={`columns`}>
                    <div className={`column ${styles.contact__column}`}>
                        <div className={`has-text-centered`}>
                            <h1 className={`title is-spaced ${styles.header__title}`}>Contact</h1>
                            <p className={`${styles.header__subtitle}`}>Feel free to get in touch with me</p>
                        </div>

                        <div className={`${styles.socialIcons}`}>
                            <a href="google.com" className={`${styles.socialIcon}`}>
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                            <a href="google.com" className={`${styles.socialIcon}`}>
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                        </div>

                        <form className={`${styles.contactForm}`}>
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
                                    <a
                                        className={`
                                                button
                                                is-secondary
                                                ${styles.submitButton}
                                            `}
                                        type="submit"
                                    >
                                        Submit
                                    </a>
                                </p>
                            </div>
                        </form>
                        <div className={`${styles.aditionalInfo}`}>
                            {`or\npaluszynska.marta@gmail.com\n+48 692 208 062`}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
