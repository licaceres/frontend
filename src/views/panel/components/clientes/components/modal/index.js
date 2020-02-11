import React, { Component } from 'react';
import { Modal, Form } from 'antd';
import * as Yup from 'yup';
import { omit } from 'lodash';
import { FormItem } from '../../../../../../globalComponents';

const validateSchema = Yup.object().shape({
  idcliente: Yup.string()
    .required('Description is required.'),

  razonsocialcliente: Yup.string()
    .required('Url file is required.'),

  apellidocliente: Yup.string()
    .required('Name is required.'),

  nombrecliente: Yup.string()
    .required('Description is required.'),

  direccioncliente: Yup.string()
    .required('Url file is required.'),

  telefonocliente: Yup.number()
    .required('Name is required.'),

  emailcliente: Yup.string()
    .required('Description is required.')
    .email('Formato de email incorrecto')
});

class CertModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        idcliente: '',
        razonsocialcliente: '',
        apellidocliente: '',
        nombrecliente: '',
        direccioncliente: '',
        telefonocliente: '',
        emailcliente: ''
      },
      errors: {}
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible && !!this.props.cliente) {
      this.setState({
        form: omit(this.props.cliente, ['lazyLoader','proyecto'])
      });
    }
  }

  render() {
    const { visible, handleModal, creating, editando, cliente } = this.props;
    const { form, errors } = this.state;

    return (
      <Modal
        title={!!cliente ? 'Editar Cliente' : 'Nuevo Cliente'}
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

              if (key === 'telefonocliente') {
                type = 'number';
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

      if (!!this.props.cliente) {
        return this.props.editarCliente();
      }

      this.props.crearCliente(form);
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
}

export default CertModal;