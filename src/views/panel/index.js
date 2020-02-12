import './index.css';
import React, { Component } from 'react';
import { Layout, Menu, Icon, Button, Tag, Dropdown } from 'antd';
import { Route, Switch } from 'react-router-dom';
import { isMobile } from '../../utils';
//import { Component404 } from 'globalComponents';
import { Clientes, Empleados, nanoComponente } from './components';

const { Content, Sider, Header } = Layout;

const menu = [{
  group: 'Clientes',
  items: [{
      path: '/',
      label: 'Buscar',
      icon: 'user'
    }, 
    {
      path: '/nano',
      label: 'Nano',
      icon: 'safety-certificate'
    },
    {
      path:'/empleados',
      label: 'Empleados',
      icon: 'user'
    }
  ],

}, 
// {
//   group: 'Panel',
//   items: [{
//     path: '/user',
//     label: 'User',
//     icon: 'user'
//   }]
// }
];

class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      selected: ['/'],
      currentUser: JSON.parse(localStorage.getItem('currentUser'))
    };

  }

  componentDidMount = async () => {
    this.setState({
      selected: [this.props.location.pathname]
    });
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        selected: [this.props.location.pathname]
      });
    }
  }

  handleLinkClick = (route) => {
    this.props.history.push(route);
  }

  onCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  renderSlider = () => {
    // const { role } = this.props.user.user;
    // let menu = userMenu;

    // if (role === 'admin') {
    //   menu = adminMenu;
    // } else if (role === 'superAdmin') {
    //   menu = superAdminMenu;
    // }

    return (
      <Sider 
        collapsible 
        defaultCollapsed={isMobile} 
        onCollapse={this.onCollapse} 
        breakpoint='sd' 
        collapsedWidth={!isMobile ? 80 : 0}>
        <div className='logo'>
          <p style={{ color: 'white', fontSize: '1.5em', marginTop: '15px', marginLeft: '22px' }}>GPRO</p>
        </div>

        <Menu
          mode='inline'
          theme='dark'
          selectedKeys={this.state.selected}>
          {
            menu.map((item, index) => {
              if (item.group) {
                return (
                  <Menu.ItemGroup key={`group-${index}`} title={item.group}>
                    {
                      item.items.map((element) => 
                        <Menu.Item
                          key={element.path}
                          onClick={() => this.handleLinkClick(element.path)}>
                          <Icon type={element.icon}/>
                          <span>{element.label}</span>
                        </Menu.Item>
                      )
                    }
                  </Menu.ItemGroup>
                );
              } else {
                return (
                  <Menu.Item
                    key={item.path}
                    onClick={() => this.handleLinkClick(item.path)}>
                    <Icon type={item.icon}/>
                    <span>{item.label}</span>
                  </Menu.Item>
                )
              }
            })
          }
        </Menu>
      </Sider>
    );
  }

  renderHeader = () => {
    const { currentUser } = this.state;
    return (
      <Header align='right' style={{ paddingRight: '15px' }}>
        <Tag color='geekblue' hidden={isMobile}><Icon type='user' /> {currentUser.username}</Tag>
        <Tag color='geekblue' style={{ marginRight: '25px' }} hidden={isMobile}><Icon type='tag' /> {currentUser.rol}</Tag>
        <Button type='primary' breakpoint='sm' hidden={isMobile} onClick={this.logOut}>Cerrar sesión</Button>
        <div hidden={!isMobile}>
          <Dropdown overlay={this.menuMovil} trigger={['click']}>
            <Button type='primary' className='ant-dropdown-link' shape='circle' icon='user' onClick={this.logOut}/>
          </Dropdown>
        </div>
      </Header>
    );
  }

  renderContent = () => {
    return (
      <Content className='panel--content'>
        <Switch>
          <Route exact path='/' component={Clientes} />
          <Route exact path='/nano' component={nanoComponente} />
          <Route exact path='/empleados' component={Empleados} />
          {/* <Route component={Component404}/> */}
        </Switch>
      </Content>
    );
  }

  menuMovil = () => {
    const { currentUser } = this.state;
    return (
      <Menu>
        <Menu.ItemGroup key='0'>
          <Tag color='geekblue'><Icon type='user' /> {currentUser.username}</Tag>
        </Menu.ItemGroup>
        <Menu.ItemGroup key='1'>
          <Tag color='geekblue' style={{ marginBottom: '10px' }}><Icon type='tag' /> {currentUser.role}</Tag>
        </Menu.ItemGroup>
        <Menu.Divider />
        <Menu.Item key='3' onClick={this.logOut}>Cerrar sesión</Menu.Item>
      </Menu>
    );
  }

  render() {
    return (
      <Layout className='panel'>
        {this.renderSlider()}
        <Layout>
          {this.renderHeader()}
          {this.renderContent()}
        </Layout>
      </Layout>
    );
  }

  logOut = () => {
    localStorage.clear();
    window.location.reload();
  }
}

export default Panel;
