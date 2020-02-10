import './index.css';
import React, { Component } from 'react';
import { Row, Col, Table, Button, Form, Divider, message } from 'antd';
import { Modal } from './components';
import { getHeader } from '../../../../utils';
import axios from 'axios';
import { FormItem } from '../../../../globalComponents';

const columns = [
  {
    title: 'CUIT',
    dataIndex: 'idCliente',
    key: 'idCliente',
    sorter: (a, b) => {
      return a.idCliente - b.idCliente;
    },
  },
  {
    title: 'R.Social',
    dataIndex: 'razonSocialCliente',
    key: 'razonSocialCliente'
  },
  {
    title: 'Nombre y Apellido',
    key: 'fullname',
    sorter: (a, b) => {
      return a.nombreCliente - b.nombreCliente;
    },
    render: item => {
      return `${item.nombreCliente} ${item.apellidoCliente}`
    }
  },
  {
    title: 'Dirección',
    dataIndex: 'direccionCliente',
    key: 'direccionCliente',
  },
  {
    title: 'E-Mail',
    dataIndex: 'emailCliente',
    key: 'emailCliente',
  }
];

class Certification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      loading: false,
      dato: '',
      cuit: '',
      errros: {},
      clientes: []
    };
  }

  render() {
    const { visible, loading, clientes, dato, cuit } = this.state;

    return (
      <div>
        <Button
          type='primary'
          icon='safety-certificate'
          style={{ marginBottom: '20px' }}
          onClick={this.handleModal}>
          Crear cliente
        </Button>

        <Form
          onSubmit={this.handleSubmit}
          className='login-form'>
            
          <Row type='flex'>
            <Col span={12}>
              <FormItem 
                key='dato'
                label='Nombre/Apellido/Razón social:'
                name='dato'
                placeholder='Ingrese'
                value={dato}
                error={null}
                onChange={this.onChange}/>
            </Col>

            <Col span={11} offset={1}>
              <FormItem 
                key='cuit'
                name='cuit'
                label='cuit'
                placeholder='Ingrese'
                value={cuit}
                error={null}
                onChange={this.onChange}/>
            </Col>
          </Row>

          <div className='clientes-buttons'>
            <Button 
              type='primary' 
              icon='search'
              htmlType='submit'>
              Buscar
            </Button>
            <Button
              style={{ marginLeft: '10px' }}
              onClick={() => this.setState({ cuit: '', dato: '' })}>
              Limpiar
            </Button>
          </div>
        </Form>

        <Divider dashed />

        <Table 
          columns={columns} 
          pagination={{ pageSize: 5 }}
          dataSource={clientes}
          loading={loading}
          scroll={{ x: true }}
          rowKey='idCliente'
          bordered
          locale={{ emptyText: "No hay clientes" }} />

        <Modal 
          visible={visible}
          handleModal={this.handleModal} />
      </div>
    );
  }

  onChange = (value, key) => {
    this.setState({ [key]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { cuit, dato } = this.state;

    if (!cuit && !dato) {
      return message.warning('Complete formulario para realizar la busqueda');
    }

    let url;

    if (!!cuit) {
      url = `http://localhost:60932/cliente/cuit/${cuit}`
    } else {
      url = `http://localhost:60932/cliente/dato/${dato}`
    }

    this.handleRequest(url);
  }

  handleRequest = async (url) => {
    try {
      this.setState({ loading: true });
      const res = await axios.get(url, getHeader());
      this.setState({ clientes: res.data });
    } catch (error) {
      let messageError = 'Hubo un error';
      if (error.response) {
        messageError = error.response.data.message;
      }

      message.error(messageError);
    }
    this.setState({ loading: false });
  }

  handleModal = () => {
    this.setState({ visible: !this.state.visible });
  }
}

export default Certification;