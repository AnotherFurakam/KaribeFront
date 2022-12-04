//Hooks
import React, { useEffect } from 'react';

//Bootstrap
import { Col, Container, Image, Row } from 'react-bootstrap';

//Styled components
import FormButtonSubmit from './styled-components/FormButtonSubmit';
import FormContainer from './styled-components/FormContainer';
import FormForgetPassLabel from './styled-components/FormForgetPassLabel';
import FormInput from './styled-components/FormInput';
import MainContainer from './styled-components/MainContainer';

//Images
import Ballena from "/src/assets/img/Ballena.svg";
import IngresarIcon from "/src/assets/img/icons/ingresarIcon.svg";

//Formik
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";

//Interfaces
import LoginForm from '../../models/loginform.interface';
import { LoginSchema } from '../../validation/login.validation';
import FormErrorMessage from './styled-components/FormErrorMessage';
import { LoginNavbar } from '../../components/LoginNavbar';




//Props interface
export interface LoginPageInterface { }

const LoginPage: React.FC<LoginPageInterface> = () => {

	useEffect(() => {
		//* Seteando título
		document.title = "Karibe - Login"
	}, [])


	const initialValues: LoginForm = {
		usuario: '',
		password: ''
	}

	return (
		<>
			<LoginNavbar />
			<MainContainer>
				<Container className='d-flex h-100'>
					<Row className='my-auto w-100'>
						<Col>
							<FormContainer className='py-5 rounded-4 d-flex flex-column gap-5'>
								<div>
									<h1 className='display-5 fw-bold text-light text-center'>Iniciar Sesión</h1>
									<h4 className='fs-2 text-primary text-center'>El Karibe</h4>
								</div>
								<Formik
									initialValues={initialValues}
									validationSchema={LoginSchema}
									onSubmit={
										(values: LoginForm, actions: FormikHelpers<LoginForm>) => {
											console.log(values)
										}
									}
								>
									{
										({ isSubmitting, handleChange }) => (
											<Form className='d-flex flex-column align-items-center justify-content-around h-100'>
												<div className='w-100 d-flex flex-column align-items-center'>
													<Field
														id='usuario'
														name='usuario'
														onChange={handleChange}
														component={FormInput}
														placeholder='Usuario'
														autoComplete='off'
													/>
													<ErrorMessage component={FormErrorMessage} name='usuario' />
												</div>
												<div className='w-100 d-flex flex-column align-items-center'>
													<Field
														id='password'
														name='password'
														onChange={handleChange}
														component={FormInput}
														placeholder='Contraseña'
														type={'password'}
														autoComplete='off'
													/>
													<ErrorMessage component={FormErrorMessage} name='password' />
												</div>
												<FormButtonSubmit type='submit' disabled={isSubmitting}>
													<p className='m-0 fs-3 text-light'>{!isSubmitting && 'Ingresar'}</p>
													{
														isSubmitting ?
															<div className='spinner-border text-light opacity-75'></div> :
															<Image src={IngresarIcon} />
													}
												</FormButtonSubmit>
												<FormForgetPassLabel>¿Olvidaste tu contraseña?</FormForgetPassLabel>
											</Form>
										)
									}
								</Formik>
							</FormContainer>
						</Col>
						<Col className='d-flex justify-content-end align-items-start'>
							<Image src={Ballena} fluid={true} />
						</Col>
					</Row>
				</Container>
			</MainContainer>
		</>
	);
};

export default LoginPage;
