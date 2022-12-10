import React, { useContext } from 'react';
import { Formik, FormikHelpers } from "formik";
import { ProductoContext } from '../../../../../context/Producto/ProductoProvider';
import { IOpcionProducto } from '../../../../../models/opcion_producto.interface';
import FormStyled from '../../../Productos/styled-component/FomStyled';
import InputText from '../../../../../global-styled-components/forms/InputText';
import FormErrorMessage from '../../../../../global-styled-components/forms/FormErrorMessage';
import FormImage from '../../../../../global-styled-components/forms/FormImage';
import SubmitButton from '../../../../../global-styled-components/forms/SubmitButton';
import { OpcionProductoSchema } from '../../../../../validation/opcion_producto.validation';
import Swal from 'sweetalert2';
export interface OpcionProductoFormInterface {
	titulo: string,
	handleCloseModal: () => void
}

const OpcionProductoForm: React.FC<OpcionProductoFormInterface> = ({ titulo, handleCloseModal }) => {

	const { selectedProducto, selectedOcionProducto, postOpcionProducto, putOpcionProducto } = useContext(ProductoContext)

	const initialValues: IOpcionProducto = {
		titulo: selectedOcionProducto?.titulo ?? '',
		descripcion: selectedOcionProducto?.descripcion ?? '',
		precio_estandar: selectedOcionProducto?.precio_estandar ?? '',
		url: selectedOcionProducto?.url ?? ''
	}

	return (
		<Formik
			initialValues={initialValues}
			enableReinitialize
			validationSchema={OpcionProductoSchema}
			onSubmit={
				async (values: IOpcionProducto, helpers: FormikHelpers<IOpcionProducto>) => {
					if (!selectedOcionProducto) {
						await postOpcionProducto(selectedProducto?.id as number, values).then(res => {
							helpers.setSubmitting(false)
							handleCloseModal()
							Swal.fire({
								text: 'Opcion de producto registrado con éxito',
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
						await putOpcionProducto(selectedProducto?.id as number, values).then(res => {
							helpers.setSubmitting(false)
							handleCloseModal()
							Swal.fire({
								text: 'Opcion de producto actualizado con éxito',
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
			{
				({ isSubmitting, values, handleChange, errors }) => (
					<FormStyled>
						<h1 className='display-6 text-muted'>{titulo}</h1>
						<div className='row mt-4'>
							<div className='col d-flex flex-column gap-4'>
								<div>
									<InputText id='titulo' name='titulo' placeholder="Título" autoComplete='off' />
									<FormErrorMessage name='titulo' component={'p'} />
								</div>
								<div>
									{/*  
									//* Solo para el text area le definimos el value, ya que sin eso no toma el valor del selectedProducto
									*/}
									<InputText name='descripcion' id='descripcion' as='textarea' value={values.descripcion} onChange={handleChange} rows={10} placeholder="Descripción" autoComplete='off' />
									<FormErrorMessage name='descripcion' component={'p'} />
								</div>
								<div>
									<InputText type='number' name='precio_estandar' placeholder='Precio' autoComplete='off' />
									<FormErrorMessage name='precio_estandar' component={'p'} />
								</div>
							</div>
							<div className='col d-flex gap-3 flex-column align-items-center justify-content-between'>
								<FormImage>
									<img
										src={values.url !== '' && !errors.url ? values.url : 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'}
										className="img-fluid"
									/>
								</FormImage>
								<div className='w-100'>
									<InputText name='url' placeholder="Url de imagen" autoComplete='off' />
									<FormErrorMessage name='url' component={'p'} />
								</div>
							</div>
						</div>
						<div className='d-flex justify-content-center mt-3'>
							<SubmitButton type='submit' disabled={isSubmitting}>
								Registrar
							</SubmitButton>
						</div>
					</FormStyled>
				)
			}
		</Formik>
	);
};

export default OpcionProductoForm;
