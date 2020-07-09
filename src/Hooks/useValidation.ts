import React, {useState} from 'react';

const required = {
    key: 'required',
    fn: (val: string) => val.length === 0,
    message: 'This field is required',
};

const badEmailFormat = {
    key: 'bad_email_format',
    fn: (val: string) => !/e/.test(val),
    message: 'Invalid email format',
};

const badLength = {
    key: 'bad_length',
    fn: (val: string, min: number, max: number) => val.length <= min || val.length >= max,
    message: 'Message is too long or too short',
};

export const useValidation = (data: {[K: string]: string}) => {
    const [errors, setErrors] = useState({});
    return {errors, setErrors};
};
