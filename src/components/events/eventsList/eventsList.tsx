import {ContentWrapper} from "../../common/contentWrapper/contentWrapper";
import {PageTitle} from "../../common/pageTitle/pageTitle";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useLayoutEffect} from "react";
import {deleteEvent, getEvents} from "../../../store/actions/events.action";
import {getEventTypes} from "../../../store/actions/eventTypes.action";
import {useAppSelector} from "../../../hooks/useAppSelector";
import moment from "moment";
import {Button, Col, Image, Popconfirm, Row, Table} from "antd";
import {useNavigate} from "react-router-dom";
import {Loader} from "../../common/loader/loader";
import {EventsTypes} from "../../../store/types/events.types";

export const EventsList = () => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useLayoutEffect(() => {
    dispatch(getEvents(100, 0));
    dispatch(getEventTypes());
  }, [dispatch])

  const {events, isLoading} = useAppSelector(state => state.events);

  const handleDelete = (id: number) => {
    dispatch(deleteEvent(id));
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '75px',
    },
    {
      title: 'Заголовок',
      dataIndex: 'name',
      key: 'title'
    },
    {
      title: 'Категория',
      dataIndex: 'type',
      key: 'type',
      render: (_: any, record: any) => record.type.name
    },
    {
      title: 'Дата проведения',
      dataIndex: 'date',
      key: 'date',
      width: '250px',
      render: (record: any) => moment(record).locale('ru').format('LLL')
    },
    {
      title: 'Действие',
      dataIndex: '',
      key: 'x',
      width: '250px',
      render: (record: any) => (
        <Row justify={'space-between'}>
          <Popconfirm
            title={'Удалить событие?'}
            onConfirm={() => handleDelete(record.key)}
          >
            <Button type="primary" danger ghost>
              Удалить
            </Button>
          </Popconfirm>
          <Button type="primary" ghost onClick={() => navigate(`/events/${record.key}`, {replace: true})}>
            Редактировать
          </Button>
        </Row>
      )
    }
  ]

  return(
    <ContentWrapper>
      <PageTitle>Все события</PageTitle>
      {
        !isLoading ?
          <Table
            columns={columns}
            dataSource={
              events.map(item => {
                return {
                  ...item,
                  key: item.id,
                }
              })
            }
            expandable={{
              expandedRowRender: (event: EventsTypes) => (
                <Row style={{gap: '20px'}}>
                  <Col>
                    <Image
                      width={300}
                      src={`${process.env.REACT_APP_API_URL}/${event.img}`}
                    />
                  </Col>
                  <Col>
                    <p>{event.description}</p>
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
