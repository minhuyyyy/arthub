import { useState } from 'react';
import { Box, Card, Checkbox, Grid, TextField, styled } from '@mui/material';
import * as Yup from 'yup';
import useAuth from '../hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { Formik } from 'formik';
import { ThemeProvider, useTheme } from '@emotion/react';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(JustifyBox)(() => ({
    height: '100%',
    padding: '32px',
    background: 'rgba(0, 0, 0, 0.01)',
}));

const RegisterStyle = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minWidth: '100vw !important',
    minHeight: '100vh !important',
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
    confirmPassword: string;
    fullname: string;
    remember: boolean;
}
11;
const initialValues: FormValues = {
    email: '',
    password: '',
    confirmPassword: '',
    fullname: '',
    remember: true,
};

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .required('Password is required!')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{8,15}$/,
            'Must contain at least 8 Characters, 1 Uppercase, 1 Lowercase, 1 Special Character, and 1 Number',
        ),
    fullname: Yup.string().required('Full name is required'),
    email: Yup.string()
        .email('Invalid Email address')
        .required('Email is required!'),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('password')],
        'Passwords must match',
    ),
});

const RegisterPage = () => {
    const theme = useTheme();
    const { register } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (values: FormValues) => {
        setLoading(true);
        try {
            await register(
                values.email,
                values.fullname,
                values.password,
                values.confirmPassword,
            );
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <RegisterStyle>
                <Card className='card'>
                    <Grid container>
                        <Grid
                            item
                            sm={6}
                            xs={12}>
                            <ContentBox>
                                <img
                                    src='/assets/posting-photo.svg'
                                    alt='Register'
                                    width='100%'
                                />
                            </ContentBox>
                        </Grid>
                        <Grid
                            item
                            sm={6}
                            xs={12}>
                            <Box
                                p={4}
                                height='100%'>
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
                                                    touched.email &&
                                                    errors.email
                                                }
                                                error={Boolean(
                                                    errors.email &&
                                                        touched.email,
                                                )}
                                                sx={{ mb: 3 }}
                                            />
                                            <TextField
                                                fullWidth
                                                size='small'
                                                type='text'
                                                name='fullname'
                                                label='Full name'
                                                variant='outlined'
                                                onBlur={handleBlur}
                                                value={values.fullname}
                                                onChange={handleChange}
                                                helperText={
                                                    touched.fullname &&
                                                    errors.fullname
                                                }
                                                error={Boolean(
                                                    errors.fullname &&
                                                        touched.fullname,
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
                                                sx={{ mb: 2 }}
                                            />
                                            <TextField
                                                fullWidth
                                                size='small'
                                                name='confirmPassword'
                                                type='password'
                                                label='Confirm Password'
                                                variant='outlined'
                                                onBlur={handleBlur}
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                helperText={
                                                    touched.confirmPassword &&
                                                    errors.confirmPassword
                                                }
                                                error={Boolean(
                                                    errors.confirmPassword &&
                                                        touched.confirmPassword,
                                                )}
                                                sx={{ mb: 2 }}
                                            />
                                            <FlexBox
                                                gap={1}
                                                alignItems='center'>
                                                <Checkbox
                                                    size='small'
                                                    name='remember'
                                                    onChange={handleChange}
                                                    checked={values.remember}
                                                    sx={{ padding: 0 }}
                                                />

                                                <h3 style={{ fontSize: 13 }}>
                                                    I have read and agree to the
                                                    terms of service.
                                                </h3>
                                            </FlexBox>

                                            <LoadingButton
                                                type='submit'
                                                color='primary'
                                                loading={loading}
                                                variant='contained'
                                                sx={{ mb: 2, mt: 3 }}>
                                                Register
                                            </LoadingButton>

                                            <h3>
                                                Already had an account?
                                                <NavLink
                                                    to='/session/signin'
                                                    style={{
                                                        color: '#1976d2',
                                                    }}>
                                                    Login
                                                </NavLink>
                                            </h3>
                                        </form>
                                    )}
                                </Formik>
                            </Box>
                        </Grid>
                    </Grid>
                </Card>
            </RegisterStyle>
        </ThemeProvider>
    );
};

export default RegisterPage;
