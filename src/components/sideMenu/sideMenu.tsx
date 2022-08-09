import {Layout, Menu} from "antd";
import {FileImageOutlined, NotificationOutlined, ShopOutlined, SnippetsOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const { Sider} = Layout;

const SideMenu = () => {
  return (
    <Sider>
      <Menu
        theme={'dark'}
        mode="inline"
        items={[
          {
            key: 1,
            icon: <NotificationOutlined />,
            label: "Новости",
            children: [
              {
                key: 11,
                label: <Link to={'/news'}>Все новости</Link>
              },
              {
                key: 12,
                label: <Link to={'/news/add'}>Добавить новость</Link>
              }
            ]
          },
          {
            key: 2,
            icon: <ShopOutlined />,
            label: "Корнеры",
            children: [
              {
                key: 21,
                label: <Link to={"/corners/types"}>Категории кухни</Link>
              },
            ]
          },
          {
            key: 3,
            icon: <SnippetsOutlined />,
            label: "Афиша",
            children: [
              {
                key: 31,
                label: <Link to={"/events"}>Вся афиша</Link>
              },
              {
                key: 32,
                label: <Link to={"/events/add"}>Добавить событие</Link>
              },
              {
                key: 33,
                label: <Link to={"/events/types"}>Категории событий</Link>
              }
            ]
          },
          {
            key: 4,
            icon: <FileImageOutlined />,
            label: "Галерея",
            children: [
              {
                key: 41,
                label: <Link to={'/gallery'}>Вся галерея</Link>
              },
              {
                key: 42,
                label: <Link to={'/gallery/add'}>Добавить фотографию</Link>
              }
            ]
          }
        ]}
      />
    </Sider>
  );
}

export default SideMenu;
