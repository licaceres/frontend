import React, { Component } from 'react';
import { Card, Table, Button } from 'antd';
import { Modal } from './components';
import moment from 'moment';
import { date_format, getHeader } from '../../../../utils';
import axios from 'axios';

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
    key: 'razonSocialCliente',
    render: data => {
      return (
        <a href={data} target='_blank'>Original Document</a>
      )
    }
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
      clientes: []
    };
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const res = await axios.get("http://localhost:60932/cliente/dato/a", getHeader());
      this.setState({ clientes: res.data });
    } catch (error) {
      console.log(error)
    }
    this.setState({ loading: false });
  }


  render() {
    const { visible, loading, clientes } = this.state;

    return (
      <Card title='Clientes'>
        <Button
          type='primary'
          icon='safety-certificate'
          style={{ marginBottom: '20px' }}
          onClick={this.handleModal}>
          Crear cliente
        </Button>

        <Table 
          columns={columns} 
          pagination={{ pageSize: 5 }}
          dataSource={clientes}
          loading={loading}
          scroll={{ x: true }}
          rowKey='_id'
          bordered
          locale={{ emptyText: "No hay clientes" }} />

        <Modal 
          visible={visible}
          handleModal={this.handleModal} />
      </Card>
    );
  }


  handleModal = () => {
    this.setState({ visible: !this.state.visible });
  }
}

export default Certification;