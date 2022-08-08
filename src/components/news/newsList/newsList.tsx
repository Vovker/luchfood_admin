import {ContentWrapper} from "../../common/contentWrapper/contentWrapper";
import {PageTitle} from "../../common/pageTitle/pageTitle";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useLayoutEffect, useState} from "react";
import {deleteNews, getNews} from "../../../store/actions/news.action";
import {Image, Table, Row, Col, Popconfirm, Button} from 'antd';
import {NewsTyped} from "../../../store/types/news.types";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {Loader} from "../../common/loader/loader";
import {useNavigate} from "react-router-dom";
import moment from "moment";

export const NewsList = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);

  useLayoutEffect(() => {
    dispatch(getNews(100, page));
    setPage(prevState => prevState++);
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteNews(id));
  }

  const {news, isLoading} = useAppSelector(state => state.news);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '75px',
    },
    {
      title: 'Заголовок',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Дата создания',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '10%',
      render: (record: any) => moment(record.created_at).locale('ru').format('DD MMMM YYYY')
    },
    {
      title: 'Действие',
      dataIndex: '',
      key: 'x',
      width: '250px',
      render: (record: any) => (
        <Row justify={'space-between'}>
          <Popconfirm
            title={'Удалить новость?'}
            onConfirm={() => handleDelete(record.key)}
          >
            <Button type="primary" danger ghost>
              Удалить
            </Button>
          </Popconfirm>
          <Button type="primary" ghost onClick={() => navigate(`/news/${record.key}`, {replace: true})}>
            Редактировать
          </Button>
        </Row>
      )
    }
  ]

  return (
    <ContentWrapper>
      <PageTitle>Все новости</PageTitle>
      {
        !isLoading ?
          <Table
            columns={columns}
            dataSource={
              news.map(item => {
                return {
                  ...item,
                  key: item.id,
                }
              })
            }
            expandable={{
              expandedRowRender: (news: NewsTyped) => (
                <Row style={{gap: '20px'}}>
                  <Col>
                    <Image
                      width={300}
                      src={`${process.env.REACT_APP_API_URL}/${news.img}`}
                    />
                  </Col>
                  <Col>
                    <p>{news.description}</p>
                    <p>{news.body}</p>
                  </Col>
                </Row>
              )
            }}
          />
          : <Loader alert={'Получаем список новостей'} description={'Подождите немного...'}/>
      }
    </ContentWrapper>
  );
}
