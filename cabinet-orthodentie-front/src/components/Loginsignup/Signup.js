import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { queryApi } from "../../utils/queryApi";
import { useNavigate } from "react-router-dom";


function Signup() {
        return (
            <Formik
                initialValues={{
                    Nom: '',
                    Prenom: '',
                    Numtel: '',
                    Role:'Secretaire',
                    Email: '',
                    Password: '',
                    confirmPassword: ''
                }}
                validationSchema={Yup.object().shape({
                    Nom: Yup.string()
                        .required('First Name is required'),
                    Prenom: Yup.string()
                        .required('Last Name is required'),
                    Numtel: Yup.string()
                        .required('Numtel is required'),
                    Email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                    Password: Yup.string()
                        .min(6, 'Password must be at least 6 characters')
                        .required('Password is required'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('Password'), null], 'Passwords must match')
                        .required('Confirm Password is required')
                })}
                onSubmit={fields => {
                    console.log("yaa")

                     const [data, err] =   queryApi("User/add", JSON.stringify(fields, null, 2), "POST", false);
                }}
                render={({ errors, status, touched }) => (

                    <Form>
                         <div className="jumbotron">
        <div className="container">
            <div className="row">
                <div className="col-md-1 offset-md-3"></div>
                    <div className="container-sm">    
                        <div className="form-group">
                            <label htmlFor="Nom">First Name</label>
                            <Field name="Nom" type="text" className={'form-control' + (errors.Nom && touched.Nom ? ' is-invalid' : '')} />
                            <ErrorMessage name="Nom" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Prenom">Last Name</label>
                            <Field name="Prenom" type="text" className={'form-control' + (errors.Prenom && touched.Prenom ? ' is-invalid' : '')} />
                            <ErrorMessage name="Prenom" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Numtel">Last Name</label>
                            <Field name="Numtel" type="text" className={'form-control' + (errors.Numtel && touched.Numtel ? ' is-invalid' : '')} />
                            <ErrorMessage name="Numtel" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Email">Email</label>
                            <Field name="Email" type="text" className={'form-control' + (errors.Email && touched.Email ? ' is-invalid' : '')} />
                            <ErrorMessage name="Email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Password">Password</label>
                            <Field name="Password" type="password" className={'form-control' + (errors.Password && touched.Password ? ' is-invalid' : '')} />
                            <ErrorMessage name="Password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Register</button>
                            <button type="reset" className="btn btn-secondary">Reset</button>

                        </div>
                        <a href ="/login" className="btn btn-secondary">Se connecter</a>
                        </div>
                        </div>
            </div>
        </div>
                    </Form>
                )}
            />
        )
    }


export default  Signup ; 