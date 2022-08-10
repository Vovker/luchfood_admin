import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {ContentWrapper} from "../../common/contentWrapper/contentWrapper";
import {PageTitle} from "../../common/pageTitle/pageTitle";
import {useLayoutEffect} from "react";
import {deleteCorner, getCorners} from "../../../store/actions/corners.action";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {Button, Col, Image, Popconfirm, Row, Table} from "antd";
import {useNavigate} from "react-router-dom";
import {Loader} from "../../common/loader/loader";
import {CornerTyped} from "../../../store/types/corners.types";

export const CornersList = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useLayoutEffect(() => {
    dispatch(getCorners());
  }, [dispatch]);

  const {corners, isLoading} = useAppSelector(state => state.corners);

  const handleDelete = (id: number) => {
    dispatch(deleteCorner(id));
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '75px',
    },
    {
      title: 'Логотип',
      dataIndex: 'logo',
      width: '40px',
      key: 'logo',
      render: (record: string) => <Image width={20} src={`${process.env.REACT_APP_API_URL}/${record}`}/>
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      width: '300px'
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      key: 'address',
      width: '150px'
    },
    {
      title: 'Тип кухни',
      dataIndex: 'kitchenType',
      key: 'kitchenType',
      width: '120px',
      render: (record: any) => record.name
    },
    {
      title: 'Действие',
      dataIndex: '',
      key: 'x',
      width: '250px',
      render: (record: any) => (
        <Row style={{gap: '20px'}}>
          <Popconfirm
            title={'Удалить событие?'}
            onConfirm={() => handleDelete(record.key)}
          >
            <Button type="primary" danger ghost>
              Удалить
            </Button>
          </Popconfirm>
          <Button type="primary" ghost onClick={() => navigate(`/corners/${record.key}`, {replace: true})}>
            Редактировать
          </Button>
        </Row>
      )
    }
  ]

  return (
    <ContentWrapper>
      <PageTitle>Корнеры</PageTitle>
      {
        !isLoading ?
          <Table
            columns={columns}
            dataSource={
              corners.map(item => {
                return {
                  ...item,
                  key: item.id,
                }
              })
            }
            expandable={{
              expandedRowRender: (corner: CornerTyped) => (
                <Row style={{gap: '20px'}}>
                  <Col>
                    <Image
                      width={300}
                      src={`${process.env.REACT_APP_API_URL}/${corner.mainImage}`}
                    />
                  </Col>
                  <Col span={12}>
                    <p>{corner.description}</p>
                  </Col>
                </Row>
              )
            }}
          />
          : <Loader alert={'Получаем список корнер'} description={'Подождите немного...'}/>
      }
    </ContentWrapper>
  );
}
