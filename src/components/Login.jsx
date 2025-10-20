import React, { useEffect, useState } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    FormFeedback,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialForm = {
    email: '',
    password: '',
    terms: false,
};

const errorMessages = {
    email: 'Please enter a valid email address',
    password: 'Password must be at least 4 characters long',
};

export default function Login() {
    const [form, setForm] = useState(initialForm);
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleChange = (event) => {
        let { name, value, type, checked } = event.target;
        value = type === 'checkbox' ? checked : value;
        setForm({ ...form, [name]: value });
    };

    const validateForm = () => {
        const errorList = {};
        const emailRgx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (form.email && !emailRgx.test(form.email)) {
            errorList.email = errorMessages.email;
        }

        if (form.password && form.password.length < 4) {
            errorList.password = errorMessages.password;
        }

        setErrors(errorList);
        setIsValid(Object.keys(errorList).length === 0);
    };

    useEffect(() => {
        validateForm();
    }, [form]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValid) return;

        axios
            .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
            .then((res) => {
                const user = res.data.find(
                    (item) =>
                        item.password === form.password &&
                        item.email === form.email &&
                        form.terms === true
                );
                if (user) {
                    setForm(initialForm);
                    history.push('/main');
                } else {
                    history.push('/error');
                }
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                    invalid={!!errors.email}
                    id="exampleEmail"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    onChange={handleChange}
                    value={form.email}
                />
                {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
            </FormGroup>

            <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                    invalid={!!errors.password}
                    id="examplePassword"
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    onChange={handleChange}
                    value={form.password}
                />
                {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
            </FormGroup>

            <FormGroup check>
                <Input
                    id="terms"
                    name="terms"
                    checked={form.terms}
                    type="checkbox"
                    onChange={handleChange}
                />{' '}
                <Label htmlFor="terms" check>
                    I agree to terms of service and privacy policy
                </Label>
            </FormGroup>

            <FormGroup className="text-center p-4">
                <Button disabled={!form.terms || !isValid} color="primary">
                    Sign In
                </Button>
            </FormGroup>
        </Form>
    );
}
