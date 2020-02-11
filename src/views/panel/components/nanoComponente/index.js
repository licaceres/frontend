import './index.css';
import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

class Certification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fecha: ''
    };
  }

  onChange = fecha => {
    console.log('fecha: ', moment(fecha).format('DD/MM/YYYY hh:mm'))
  }

  onChangeRange = fechas => {
    console.log('fecha inicio: ', moment(fechas[0]).format('DD/MM/YYYY hh:mm'))
    console.log('fecha fin: ', moment(fechas[1]).format('DD/MM/YYYY hh:mm'))
  }

  render() {
    const { fecha } = this.state;

    return (
      <div>
        <DatePicker onChange={this.onChange} />
        <br />
        <RangePicker onChange={this.onChangeRange} />
      </div>
    );
  }

}

export default Certification;