import { faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import FormField from '../components/Form/FormField';
import styles from './contact.module.scss';

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

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    message: yup.string().required().max(250),
});

const InitialErrors = {
    name: [],
    email: [],
    message: [],
};

interface Errors {
    [key: string]: yup.ValidationError[];
}

const ContactForm = () => {
    const [formFields, setFormFields] = useState(InitialState);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Errors>(InitialErrors);

    const sendEmail = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const url = `${process.env.GATSBY_API_URL}/send`;

        axios.post(
            url,
            {
                name: formFields[0].value,
                email: formFields[1].value,
                message: formFields[2].value,
            },
        )
            .then((res) => {
                setFormFields(InitialState);
            })
            .catch((err) => {
                console.log(errors);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleTextInputChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        const newForm = [...formFields];
        newForm[index].value = value;
        setFormFields(newForm);
    };

    const refFields = {
        name: formFields[0].value,
        email: formFields[1].value,
        message: formFields[2].value,
    };

    const checkForm = useCallback(
        () => {
            schema.validate(refFields, { abortEarly: false })
                .then(() => {
                    setErrors(InitialErrors);
                })
                .catch(({inner}) => {
                    const errorsCopy = { ...errors };
                    Object.keys(errorsCopy).forEach((errorName) =>{
                        errorsCopy[errorName] = inner.filter((error: yup.ValidationError) => error.path === errorName);
                    });
                    setErrors(errorsCopy);
                });
        },
        [formFields],
    );

    useEffect(checkForm, [checkForm]);

    useEffect(() => {
        console.log(errors);
    }, [errors]);

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
                            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/marta-paluszy%C5%84ska-7b80a5aa" className={`${styles.socialIcon}`}>
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/marta.paluszynska" className={`${styles.socialIcon}`}>
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                        </div>

                        <form className={`${styles.contactForm}`} onSubmit={sendEmail}>
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
                                        errors[field.name][0]?.message
                                    }
                                />
                            ))}
                            <div className="field is-grouped is-grouped-right">
                                <p className="control">
                                    <button
                                        className={`
                                                button
                                                is-secondary
                                                ${loading ? 'is-loading' : ''}
                                                ${styles.submitButton}
                                            `}
                                        type="submit"
                                        disabled={Object.keys(errors).reduce((p, c) => [...p, ...errors[c]], [] as any).length}
                                    >
                                        Submit
                                    </button>
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
