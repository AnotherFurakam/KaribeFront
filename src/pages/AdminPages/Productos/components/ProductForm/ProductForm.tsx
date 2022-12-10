import React, { useContext } from 'react';
import { Formik, ErrorMessage, FormikState, Field, FormikHelpers, FormikProps } from "formik";
import { IProducto } from '../../../../../models/producto.interface';
import { ProductoFormSchema } from '../../../../../validation/producto.validation';
import InputText from '../../../../../global-styled-components/forms/InputText';
import RadioButton from '../../../../../global-styled-components/forms/RadioButton';
import FormStyled from '../../styled-component/FomStyled';
import FormImage from '../../../../../global-styled-components/forms/FormImage';
import SubmitButton from '../../../../../global-styled-components/forms/SubmitButton';
import FormErrorMessage from '../../../../../global-styled-components/forms/FormErrorMessage';
import { ProductoContext } from '../../../../../context/Producto/ProductoProvider';
import Swal from 'sweetalert2';
export interface ProductFormInterface {
	titulo: string,
	handleCloseModal: () => void
}

const ProductForm: React.FC<ProductFormInterface> = ({ titulo, handleCloseModal }) => {

	const { postProducto, putProducto, selectedProducto } = useContext(ProductoContext)


	const initialValues: IProducto = {
		titulo: selectedProducto?.titulo ?? '',
		descripcion: selectedProducto?.descripcion ?? '',
		de_cocina: selectedProducto?.de_cocina ?? true,
		url: selectedProducto?.url ?? ''
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={ProductoFormSchema}
			enableReinitialize //! Con esto le decimos a formik que queremos poder actualizar el initial values 
			onSubmit={
				async (values: IProducto, helpers: FormikHelpers<IProducto>) => {
					if (!selectedProducto) {
						await postProducto(values).then(res => {
							helpers.setSubmitting(false)
							handleCloseModal()
							Swal.fire({
								text: 'Producto registrado con éxito',
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
						await putProducto(selectedProducto.id as number, values).then(res => {
							helpers.setSubmitting(false)
							handleCloseModal()
							Swal.fire({
								text: 'Producto actualizado con éxito',
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
				({ isSubmitting, values, errors, setFieldValue, handleChange }: FormikProps<IProducto>) => (
					<FormStyled className='d-flex flex-column gap-4'>
						<h1 className='display-5 text-muted'>{titulo}</h1>
						<div className='row'>
							<div className='col d-flex flex-column gap-4'>
								<div>
									<InputText id='titulo' name='titulo' placeholder="Título" />
									<FormErrorMessage name='titulo' component={'p'} />
								</div>
								<div>
									{/*  
									//* Solo para el text area le definimos el value, ya que sin eso no toma el valor del selectedProducto
									*/}
									<InputText name='descripcion' id='descripcion' as='textarea' value={values.descripcion} onChange={handleChange} rows={10} placeholder="Descripción" />
									<FormErrorMessage name='descripcion' component={'p'} />
								</div>
								<div className='d-flex gap-3 align-items-center'>
									<h5 className='m-0'>De cocina:</h5>
									<div role={'group'} className='d-flex gap-3 align-align-items-center'>
										<div className='d-flex align-items-center gap-1'>
											<RadioButton type="radio" name='de_cocina' onChange={() => { setFieldValue("de_cocina", true) }} checked={values.de_cocina} />
											<label>Si</label>
										</div>
										<div className='d-flex align-items-center gap-2'>
											<RadioButton type="radio" name='de_cocina' onChange={() => { setFieldValue("de_cocina", false) }} checked={!values.de_cocina} />
											<label>No</label>
										</div>
									</div>
								</div>
							</div>
							<div className='col d-flex flex-column align-items-center justify-content-between'>
								<FormImage>
									<img
										src={values.url !== '' && !errors.url ? values.url : 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'}
										className="img-fluid"
									/>
								</FormImage>
								<InputText name='url' placeholder="Url de imagen" />
								<FormErrorMessage name='url' component={'p'} />
							</div>
						</div>
						<div className='d-flex justify-content-center'>
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

export default ProductForm;
