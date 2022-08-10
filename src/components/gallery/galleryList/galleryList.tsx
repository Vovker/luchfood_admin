import {ContentWrapper} from "../../common/contentWrapper/contentWrapper";
import {PageTitle} from "../../common/pageTitle/pageTitle";
import moment from "moment";
import {Button, Image, Popconfirm, Row, Table} from "antd";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useNavigate} from "react-router-dom";
import {deleteGallery, getGallery} from "../../../store/actions/gallery.action";
import {Loader} from "../../common/loader/loader";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useLayoutEffect} from "react";

export const GalleryList = () => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {gallery, isLoading} = useAppSelector(state => state.gallery);

  useLayoutEffect(() => {
    dispatch(getGallery(1000, 0));
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteGallery(id));
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '75px',
    },
    {
      title: 'Фотография',
      dataIndex: 'img',
      key: 'img',
      render: (record: any) => <Image height={150} src={`${process.env.REACT_APP_API_URL}/${record}`}/>
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
          <Button type="primary" ghost onClick={() => navigate(`/gallery/${record.key}`, {replace: true})}>
            Редактировать
          </Button>
        </Row>
      )
    }
  ]

  return(
    <ContentWrapper>
      <PageTitle>Все фотографии</PageTitle>
      {
        !isLoading ?
          <Table
            columns={columns}
            dataSource={
              gallery.map(item => {
                return {
                  ...item,
                  key: item.id,
                }
              })
            }
          />
          : <Loader alert={'Получаем список новостей'} description={'Подождите немного...'}/>
      }
    </ContentWrapper>
  );
};
