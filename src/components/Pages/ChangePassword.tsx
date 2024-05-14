import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { API_URL } from '../../utils/urls';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { changePassword } from '../../services/userServices/userServices';

function ChangePassword() {
    const { userInfo } = useAuth();
    const token = localStorage.getItem('accessToken');
    const initialValues = {
        newPassword: '',
        confirmNewPassword: '',
    };

    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
            .required('Password is required!')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{8,15}$/,
                'Must contain at least 8 Characters, 1 Uppercase, 1 Lowercase, 1 Special Character, and 1 Number'
            ),
        confirmNewPassword: Yup.string().oneOf(
            [Yup.ref('newPassword')],
            'Passwords must match'
        ),
    });

    const handleFormSubmit = async (values) => {
        await changePassword(
            userInfo.email,
            values.newPassword,
            values.confirmNewPassword,
            token!
        );
    };

    return (
        <Box p={4} sx={{ backgroundColor: '#fff', borderRadius: '20px' }}>
            <Typography variant="h4" component={'header'}>
                Change password
            </Typography>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
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
                            size="small"
                            name="newPassword"
                            type="password"
                            label="New Password"
                            variant="outlined"
                            onBlur={handleBlur}
                            value={values.newPassword}
                            onChange={handleChange}
                            helperText={
                                touched.newPassword && errors.newPassword
                            }
                            error={Boolean(
                                errors.newPassword && touched.newPassword
                            )}
                            sx={{ mb: 2, backgroundColor: '' }}
                        />
                        <TextField
                            fullWidth
                            size="small"
                            name="confirmNewPassword"
                            type="password"
                            label="Confirm New Password"
                            variant="outlined"
                            onBlur={handleBlur}
                            value={values.confirmNewPassword}
                            onChange={handleChange}
                            helperText={
                                touched.confirmNewPassword &&
                                errors.confirmNewPassword
                            }
                            error={Boolean(
                                errors.confirmNewPassword &&
                                    touched.confirmNewPassword
                            )}
                            sx={{
                                mb: 2,
                                // backgroundColor: '#e4e   4e4',
                            }}
                        />
                        <Button variant="contained" type="submit">
                            Submit
                        </Button>
                    </form>
                )}
            </Formik>
        </Box>
    );
}

export default ChangePassword;
