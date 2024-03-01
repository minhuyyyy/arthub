import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField } from '@mui/material';
import { Box, styled, useTheme } from '@mui/material';
import { Formik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import useAuth from '../hooks/useAuth';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',
}));

const JWTRoot = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100vh !important',
    minWidth: '100vw !important',
    '& .card': {
        maxWidth: 800,
        minHeight: 400,
        margin: '0 auto',
        display: 'flex',
        borderRadius: 12,
        alignItems: 'center',
    },
}));

interface FormValues {
    email: string;
    password: string;
}

// inital login credentials
const initialValues = {
    email: 'jason@ui-lib.com',
    password: 'dummyPass',
    remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, 'Password must be 8 character length')
        .required('Password is required!'),
    email: Yup.string()
        .email('Invalid Email address')
        .required('Email is required!'),
});

const LoginPage = () => {
    document.title = 'Sign in';
    const theme = useTheme();
    // const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const handleFormSubmit = async (values: FormValues) => {
        setLoading(true);
        try {
            await login(values.email, values.password);
        } catch (e) {
            setLoading(false);
        }
    };

    return (
        <JWTRoot>
            <Card className='card'>
                <Grid container>
                    <Grid
                        item
                        sm={6}
                        xs={12}>
                        <JustifyBox
                            p={4}
                            height='100%'
                            sx={{ minWidth: 320 }}>
                            <img
                                src='/assets/dreamer.svg'
                                width='100%'
                                alt=''
                            />
                        </JustifyBox>
                    </Grid>

                    <Grid
                        item
                        sm={6}
                        xs={12}>
                        <ContentBox>
                            <Formik
                                onSubmit={handleFormSubmit}
                                initialValues={initialValues}
                                validationSchema={validationSchema}>
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                }) => (
                                    <form onSubmit={handleSubmit}>
                                        <TextField
                                            fullWidth
                                            size='small'
                                            type='email'
                                            name='email'
                                            label='Email'
                                            variant='outlined'
                                            onBlur={handleBlur}
                                            value={values.email}
                                            onChange={handleChange}
                                            helperText={
                                                touched.email && errors.email
                                            }
                                            error={Boolean(
                                                errors.email && touched.email,
                                            )}
                                            sx={{ mb: 3 }}
                                        />

                                        <TextField
                                            fullWidth
                                            size='small'
                                            name='password'
                                            type='password'
                                            label='Password'
                                            variant='outlined'
                                            onBlur={handleBlur}
                                            value={values.password}
                                            onChange={handleChange}
                                            helperText={
                                                touched.password &&
                                                errors.password
                                            }
                                            error={Boolean(
                                                errors.password &&
                                                    touched.password,
                                            )}
                                            sx={{ mb: 1.5 }}
                                        />

                                        <FlexBox justifyContent='space-between'>
                                            <FlexBox gap={1}>
                                                <Checkbox
                                                    size='small'
                                                    name='remember'
                                                    onChange={handleChange}
                                                    checked={values.remember}
                                                    sx={{ padding: 0 }}
                                                />

                                                <h3>Remember Me</h3>
                                            </FlexBox>

                                            <NavLink
                                                to='/session/forgot-password'
                                                style={{
                                                    color: theme.palette.primary
                                                        .main,
                                                }}>
                                                Forgot password?
                                            </NavLink>
                                        </FlexBox>

                                        <LoadingButton
                                            type='submit'
                                            color='primary'
                                            loading={loading}
                                            variant='contained'
                                            sx={{ my: 2 }}>
                                            Login
                                        </LoadingButton>

                                        <h3>
                                            Don't have an account?
                                            <NavLink
                                                to='/session/signup'
                                                style={{
                                                    color: theme.palette.primary
                                                        .main,
                                                    marginLeft: 5,
                                                }}>
                                                Register
                                            </NavLink>
                                        </h3>
                                    </form>
                                )}
                            </Formik>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Card>
        </JWTRoot>
    );
};

export default LoginPage;
