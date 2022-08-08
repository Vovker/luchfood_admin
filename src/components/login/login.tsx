import {Button, Form, Input, Layout} from "antd";
import {AuthTypes} from "../../store/types/auth.types";
import {auth} from "../../store/actions/auth.action";


const Login = () => {
  const {Content } = Layout;

  const onFinish = async (values: AuthTypes) => {
    auth(values.username, values.password)
  }

  return (
    <Layout>
      <Content style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Form
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Логин"
            name="username"
            rules={[
              {
                required: true,
                message: 'Введите имя пользователя!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              {
                required: true,
                message: 'Введите пароль!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}

export default Login;
