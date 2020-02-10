import React, { useState }  from 'react';
import { Modal, Form } from 'antd';
import * as Yup from 'yup';
import { omit } from 'lodash';
import { FormItem } from '../../../../../../globalComponents';

const validateSchema = Yup.object().shape({
  description: Yup.string()
    .required('Description is required.'),

  file: Yup.string()
    .required('Url file is required.'),

  name: Yup.string()
    .required('Name is required.'),
});

const CertModal = ({ visible, handleModal, certification, createCert, getCerts }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    file: ''
  });
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   if (certification.error) {
  //     message.error(certification.error);
  //   }
  // }, [certification.error]);

  const reset = () => {
    setForm({
      description: '',
      name: '',
      file: ''
    });
    setErrors({});
    handleModal();
  }

  const onChange = (value, key) => {
    if (errors[key]) {
      let _errors = omit(errors, key);
      setErrors(_errors);
    }

    setForm({
      ...form,
      [key]: value
    });
  }

  const handleOk = async () => {
    // try {
    //   await validateSchema.validate(form, { abortEarly: false });

    //   let success = await createCert(form);

    //   if (success) {
    //     reset();
    //     getCerts();
    //     return message.success('Certficación creada con exito!');
    //   }
    // } catch (error) {
    //   let _errors = {};

    //   error.inner.forEach(error => {
    //     _errors[error.path] = error.message;
    //   });

    //   setErrors(_errors);
    // }
  }

  return (
    <Modal
      title='New certification'
      visible={visible}
      onOk={handleOk}
      okText='Confirm'
      // okButtonProps={{ 
      //   loading: certification.isFetching, 
      //   disabled: certification.isFetching
      // }}
      onCancel={reset}
      //cancelButtonProps={{ disabled: certification.isFetching }}
      cancelText='Cancel'
      width='50%'>
      <Form>

        {
          Object.keys(form).map((key, index) => {
            return (
              <FormItem
                label={key}
                key={index}
                name={key}
                placeholder={key}
                value={form[key]}
                error={errors[key]}
                onChange={onChange}/>
            );
          })
        }

      </Form>
    </Modal>
  );
}

export default CertModal;