import {PageTitle} from "../../common/pageTitle/pageTitle";
import {Button, Form, Image, Input} from "antd";
import {DragAndDrop} from "../../common/dragAndDrop/dragAndDrop";
import {ContentWrapper} from "../../common/contentWrapper/contentWrapper";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useEffect} from "react";
import {getNewsById, updateNews} from "../../../store/actions/news.action";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {Loader} from "../../common/loader/loader";
import {getBase64} from "../../../utils/getBase64";

export const EditNews = () => {

  const dispatch = useAppDispatch();

  const {id} = useParams();

  const {news, isLoading} = useAppSelector(state => state.newsById);

  useEffect(() => {
    dispatch(getNewsById(Number(id)));
  }, [dispatch, id]);

  const onFinish = async (values: any) => {
    const image = values.img ? await getBase64(values.img.file) : ''
    dispatch(updateNews(Number(id), {
      title: values.title,
      body: values.body,
      description: values.description,
      img: image
    }))
  };

  return(
    news && !isLoading ? (
      <ContentWrapper>
        <PageTitle>Редактировать новость</PageTitle>
        <Form
          size={'large'}
          layout={'vertical'}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label={'Заголовок'}
            name={'title'}
            initialValue={news.title}
            rules={[
              {
                required: true,
                message: 'Обязательное поле!',
              },
            ]}
          >
            <Input
              placeholder={'Введите название...'}
              maxLength={70}
            />
          </Form.Item>
          <Form.Item
            label={'Описание'}
            name={'description'}
            initialValue={news.description}
            rules={[
              {
                required: true,
                message: 'Обязательное поле!',
              },
            ]}
          >
            <Input.TextArea
              placeholder={"Введите короткое описание для новости..."}
              maxLength={280}
              rows={5}
            />
          </Form.Item>
          <Form.Item
            label={'Основной текст'}
            name={'body'}
            initialValue={news.body}
            rules={[
              {
                required: true,
                message: 'Обязательное поле!',
              },
            ]}
          >
            <Input.TextArea
              placeholder={"Введите основной текст..."}
              rows={10}
            />
          </Form.Item>
          <Form.Item
            label={'Изображение'}
          >
            <Image
              width={400}
              src={`${process.env.REACT_APP_API_URL}/${news.img}`}
              style={{marginBottom: '40px'}}
            />
            <DragAndDrop name={'img'} required={false}/>
          </Form.Item>
          <Form.Item>
            <Button type={'primary'} htmlType={'submit'}>
              Обновить
            </Button>
          </Form.Item>
        </Form>
      </ContentWrapper>
      ) : <Loader alert={'Новость загружается...'} description={'Подождите немного...'}/>
  );
}
