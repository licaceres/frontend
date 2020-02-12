import React, { Component } from 'react';
import { Modal, Form, DatePicker } from 'antd';
import * as Yup from 'yup';
import { omit } from 'lodash';
import moment from 'moment';
import { FormItem } from '../../../../../../globalComponents';

const validateSchema = Yup.object().shape({
  apellidoempleado: Yup.string()
    .required('Campo requerido.'),
  
  nombreempleado: Yup.string()
    .required('Campo requerido.'),
  
  fechaingreso: Yup.date()
    .required('Campo requerido.'),
  
  telefono: Yup.string()
    .required('Campo requerido.'),
  
  domicilio: Yup.string()
    .required('Campo requerido.'),
  
  localidad: Yup.number()
    .required('Campo requerido.'),
  
  provincia: Yup.string()
    .required('Campo requerido.'),
  
  dni: Yup.string()
    .required('Campo requerido.'),

  nacionalidad: Yup.string()
    .required('Campo requerido.')
});

class ClientesModal extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        form: {
          apellidoempleado: '',
          nombreempleado: '',
          fechaingreso: '',
          telefono: '',
          localidad: '',
          provincia: '',
          dni: '',
          nacionalidad: ''
        },
        errors: {}
      }
    }

    componentDidUpdate(prevProps) {
      if (!prevProps.visible && this.props.visible && !!this.props.empleado) {
        this.setState({
          form: omit(this.props.empleado, ['lazyLoader','proyecto'])
        });
      }
    }

    render() {
      const { visible, handleModal, creating, editando, empleado } = this.props;
      const { form, errors } = this.state;
    
      return (
        <Modal
          title={!!empleado ? 'Editar empleado' : 'Nuevo empleado'}
          visible={visible}
          onOk={this.handleSubmit}
          okText='Confirmar'
          okButtonProps={{ 
          loading: creating || editando, 
          disabled: creating || editando
        }}
          onCancel={handleModal}
          cancelButtonProps={{ disabled: creating || editando }}
          cancelText='Cancelar'
          width='50%'>
          <Form>
    
            {
              Object.keys(form).map((key, index) => {
                let type='text';
    
                if (key === 'telefono') {
                  type = 'number';
                }

                if (key === 'fechaingreso') {
                  return (
                    <div>
                      <p>Fecha de ingreso:</p>
                      <DatePicker value={form.fechaingreso} onChange={this.showFecha} />
                    </div>
                  );
                }

                return (
                  <FormItem
                    label={key}
                    key={index}
                    name={key}
                    type={type}
                    placeholder={key}
                    value={form[key]}
                    error={errors[key]}
                    onChange={this.onChange}/>
                );
              })
            }
    
          </Form>
        </Modal>
      );
    }

    handleSubmit = async () => {
      const { form } = this.state;
      try {
        // VALIDO CON YUP
        await validateSchema.validate(form, { abortEarly: false });
    
        if (!!this.props.empleado) {
          return this.props.editarEmpleado();
        }
    
        this.props.crearEmpleado(form);
      } catch (error) {
        let errors = {};
    
        error.inner.forEach(error => {
          errors[error.path] = error.message;
        });
    
        this.setState({ errors });
      }
    }

    onChange = (value, key) => {
      const { errors, form } = this.state;
      // SI EL PARAM TIENE ERROR, LO BORRO
      if (errors[key]) {
        let _errors = omit(errors, key);
        this.setState({
          errors: _errors
        });
      }
      // CAMBIO STATE DEL PARAM
      this.setState({
        form: Object.assign({}, form, {
          [key]: value
        })
      });
    }

    showFecha = fecha => {
      console.log('fecha: ', moment(fecha).format('DD/MM/YYYY'))
    }
}

export default ClientesModal;