import React, { Component } from 'react';
import { Layout, Menu, Icon, Button, Tag, Dropdown } from 'antd';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

export class App extends Component {

  constructor(props) {
    super(props);
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.state = {
      collapsed: false,
      width: screenWidth,
    };

    console.log(this.state.width);
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const menuMovil = (
      <Menu>
        <Menu.ItemGroup key="0">
          <Tag color="geekblue"><Icon type="user" /> username</Tag>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="1">
          <Tag color="geekblue" style={{ marginBottom: '10px' }}><Icon type="tag" /> role</Tag>
        </Menu.ItemGroup>
        <Menu.Divider />
        <Menu.Item key="3">Cerrar sesión</Menu.Item>
      </Menu>
    );

    return (
      <div className="App">
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible defaultCollapsed={this.state.width > 576 ? false : true} onCollapse={this.onCollapse} breakpoint='sd' collapsedWidth={this.state.width > 576 ? 80 : 0}>
            <div className="logo">
              <p style={{ color: 'white', fontSize: '1.5em', marginTop: '15px', marginLeft: '22px' }}>GPRO</p>
            </div>
            <Menu theme="dark" mode="inline">
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="contacts" />
                    <span>Clientes</span>
                  </span>
                }
              >
                <Menu.Item key="1">Nuevo</Menu.Item>
                <Menu.Item key="2">Editar</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="project" />
                    <span>Proyectos</span>
                  </span>
                }
              >
                <Menu.Item key="3">Item 1</Menu.Item>
                <Menu.Item key="4">Item 2</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="bars" />
                    <span>Tareas</span>
                  </span>
                }
              >
                <Menu.Item key="5">Item 1</Menu.Item>
                <Menu.Item key="6">Item 2</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={
                  <span>
                    <Icon type="team" />
                    <span>Empleados</span>
                  </span>
                }
              >
                <Menu.Item key="7">Item 1</Menu.Item>
                <Menu.Item key="8">Item 2</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub5"
                title={
                  <span>
                    <Icon type="user" />
                    <span>Usuarios</span>
                  </span>
                }
              >
                <Menu.Item key="8">Item 1</Menu.Item>
                <Menu.Item key="9">Item 2</Menu.Item>
              </SubMenu>
              <SubMenu style={{marginTop: '20px'}}
                key="sub6"
                title={
                  <span>
                    <Icon type="file-pdf" />
                    <span>Reportes</span>
                  </span>
                }
              >
                <Menu.Item key="8">Item 1</Menu.Item>
                <Menu.Item key="9">Item 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="10" style={{marginTop: '20px'}}>
                <Icon type="info-circle" />
                <span>Acerca de</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header align="right" style={{ paddingRight: '15px' }}>
              <Tag color="geekblue" hidden={this.state.width > 576 ? false : true}><Icon type="user" /> username</Tag>
              <Tag color="geekblue" style={{ marginRight: '25px' }} hidden={this.state.width > 576 ? false : true}><Icon type="tag" /> role</Tag>
              <Button type="primary" breakpoint="sm" hidden={this.state.width > 576 ? false : true}>Cerrar sesión</Button>
              <div hidden={this.state.width < 576 ? false : true}>
                <Dropdown overlay={menuMovil} trigger={['click']}>
                  <Button type="primary" className="ant-dropdown-link" shape="circle" icon="user" />
                </Dropdown>
              </div>
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
            >
          </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;