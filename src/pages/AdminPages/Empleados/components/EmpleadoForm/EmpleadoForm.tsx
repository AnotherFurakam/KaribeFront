import { Form, Formik, FormikHelpers } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { EmpleadoContext } from '../../../../../context/Empleado/EmpleadoProvider';
import FormDateInput from '../../../../../global-styled-components/forms/FormDateInput';
import FormErrorMessage from '../../../../../global-styled-components/forms/FormErrorMessage';
import FormSelect from '../../../../../global-styled-components/forms/FormSelect';
import FormSelectContainer from '../../../../../global-styled-components/forms/FormSelectContainer';
import InputText from '../../../../../global-styled-components/forms/InputText';
import SubmitButton from '../../../../../global-styled-components/forms/SubmitButton';
import { IEmpleado } from '../../../../../models/empleado.interface';
import { ILocal } from '../../../../../models/local.interface';
import { IRol } from '../../../../../models/rol.interface';
import localService from '../../../../../services/local.service';
import rolService from '../../../../../services/rol.service';
import { EmpleadoShchema } from '../../../../../validation/empleado.validation';
export interface EmpleadoFormInterface {
	handleCloseModal: () => void
}

const EmpleadoForm: React.FC<EmpleadoFormInterface> = ({ handleCloseModal }: EmpleadoFormInterface) => {

	const { createEmpleado, updateEmpleado, selectedEmpleado } = useContext(EmpleadoContext)

	const [rol, setRol] = useState<IRol[] | null>(null)

	const [local, setLocal] = useState<ILocal[] | null>(null)

	const getAllRol = async () => {
		await rolService.getAllRoles().then(res => setRol(res.payload))
	}

	const getAllLocal = async () => {
		await localService.getAllLocales().then(res => setLocal(res.payload))
	}

	const initialValues: IEmpleado = {
		nombre: selectedEmpleado?.nombre ?? '',
		ape_paterno: selectedEmpleado?.ape_paterno ?? '',
		ape_materno: selectedEmpleado?.ape_materno ?? '',
		correo: selectedEmpleado?.correo ?? '',
		documento: selectedEmpleado?.documento ?? '',
		genero: selectedEmpleado?.genero ?? '',
		fecha_nacimiento: selectedEmpleado?.fecha_nacimiento ?? '',
		telefono: selectedEmpleado?.telefono ?? '',
		local_id: selectedEmpleado?.local?.id ?? 0,
		rol_id: selectedEmpleado?.rol?.id ?? 0
	}

	useEffect(() => {
		getAllRol()
		getAllLocal()
	}, [])



	return (
		<Formik
			initialValues={initialValues}
			enableReinitialize
			validationSchema={EmpleadoShchema}
			onSubmit={
				async (values: IEmpleado, helpers: FormikHelpers<IEmpleado>) => {
					if (!selectedEmpleado) {
						await createEmpleado(values).then(res => {
							helpers.setSubmitting(false)
							handleCloseModal()
							Swal.fire({
								text: 'Empleado registrado con éxito',
								icon: 'success',
							})
						}).catch(err => {
							helpers.setSubmitting(false)
							Swal.fire({
								text: err.message,
								icon: 'error',
							})
						})
					} else {
						await updateEmpleado(selectedEmpleado?.id as number,values).then(res => {
							helpers.setSubmitting(false)
							handleCloseModal()
							Swal.fire({
								text: 'Emlpeado actualizado con éxito',
								icon: 'success',
							})
						}).catch(err => {
							helpers.setSubmitting(false)
							Swal.fire({
								text: err.message,
								icon: 'error',
							})
						})
					}
				}
			}
		>
			{({ handleChange, isSubmitting, setFieldValue, values }) => (
				<Form>
					<div className='row'>
						<div className='col d-flex flex-column gap-3'>
							<div>
								<InputText name='nombre' placeholder='Nombre' tabIndex={1} />
								<FormErrorMessage name='nombre' component={'p'} />
							</div>
							<div>
								<InputText name='ape_materno' placeholder='Apellido materno' tabIndex={3} />
								<FormErrorMessage name='ape_materno' component={'p'} />
							</div>
							<div>
								<FormSelectContainer>
									<FormSelect as={'select'} onChange={handleChange} value={values.genero} id='genero' name='genero' placeholder='Apellido materno' tabIndex={5}>
										<option value=''>Selecciona su género...</option>
										<option value="M">Masculino</option>
										<option value="F">Femenino</option>
									</FormSelect>
								</FormSelectContainer>
								<FormErrorMessage name='genero' component={'p'} />
							</div>
							<div>
								<InputText name='telefono' placeholder='Teléfono' maxLength={9} tabIndex={7} />
								<FormErrorMessage name='telefono' component={'p'} />
							</div>
							<div>
								<FormSelectContainer>
									<FormSelect as={'select'} value={values.rol_id} onChange={(e) => setFieldValue('rol_id', parseInt(e.target.value))} id='rol_id' name='rol_id' tabIndex={9}>
										<option value=''>Selecciona su rol...</option>
										{
											rol?.map(r => <option key={r.id} value={r.id}>{r.titulo}</option>)

										}
									</FormSelect>
								</FormSelectContainer>
								<FormErrorMessage name='rol_id' component={'p'} />
							</div>
						</div>
						<div className='col d-flex flex-column gap-3'>
							<div>
								<InputText name='ape_paterno' placeholder='Apellido paterno' tabIndex={2} />
								<FormErrorMessage name='ape_paterno' component={'p'} />
							</div>
							<div>
								<InputText name='documento' placeholder='DNI' tabIndex={4} maxLength={8} />
								<FormErrorMessage name='documento' component={'p'} />
							</div>
							<div>
								<FormDateInput type='date' name='fecha_nacimiento' tabIndex={6} />
								<FormErrorMessage name='fecha_nacimiento' component={'p'} />
							</div>
							<div>
								<FormDateInput type='text' name='correo' placehalder='Correo electrónico' tabIndex={8} maxLength={40} />
								<FormErrorMessage name='correo' component={'p'} />
							</div>
							<div>
								<FormSelectContainer>
									<FormSelect as={'select'} value={values.local_id} onChange={(e) => setFieldValue('local_id', parseInt(e.target.value))} id='local_id' name='local_id' tabIndex={10}>
										<option value={''}>Selecciona su local...</option>
										{
											local?.map(l => <option key={l.id} value={l.id}>{l.distrito}</option>)
										}
									</FormSelect>
								</FormSelectContainer>
								<FormErrorMessage name='local_id' component={'p'} />
							</div>
						</div>
					</div>
					<div className='d-flex justify-content-center my-3'>
						<SubmitButton disabled={isSubmitting}>Enviar</SubmitButton>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default EmpleadoForm;
