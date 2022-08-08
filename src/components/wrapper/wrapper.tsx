import {Button, Image, Layout, Row} from "antd";
import SideMenu from "../sideMenu/sideMenu";
import React from "react";
import {Outlet, useNavigate} from "react-router-dom";
import logo from '../../assets/logo.svg'

const Wrapper: React.FC<{token: string | null}> = ({token}) => {

  const navigate = useNavigate();

  if(!token) {
    navigate('/login', {replace: true})
  }

  const { Header, Content } = Layout;

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login', {replace: true})
  }

  return (
    <>
      <Header>
        <Row align={'middle'}>
          <Image
            width={120}
            src={logo}
            preview={false}
          />
          <h1 style={{marginLeft: '60px', color: 'white'}}>Панель управления</h1>
          <Button
            type="primary"
            danger
            ghost
            onClick={() => logout()}
            style={{marginLeft: 'auto'}}
          >
            Выйти
          </Button>
        </Row>
      </Header>
      <Layout>
        <SideMenu/>
        <Content>
          <Outlet/>
        </Content>
      </Layout>
    </>
  );
}

export default Wrapper;
