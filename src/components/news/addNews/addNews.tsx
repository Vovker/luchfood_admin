import {Button, Form, Input} from "antd";
import {PageTitle} from "../../common/pageTitle/pageTitle";
import {ContentWrapper} from "../../common/contentWrapper/contentWrapper";
import {DragAndDrop} from "../../common/dragAndDrop/dragAndDrop";
import {CreateNewsTyped} from "../../../store/types/news.types";
import {getBase64} from "../../../utils/getBase64";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {createNews} from "../../../store/actions/news.action";

export const AddNews = () => {

  const dispatch = useAppDispatch();

  const onFinish = async (values: any) => {
    const img = await getBase64(values.img.file).then(x => x);
    const data: CreateNewsTyped = {
      title: values.title,
      description: values.description,
      body: values.body,
      img
    }

    dispatch(createNews(data))
  }

  return (
    <ContentWrapper>
      <PageTitle>Добавить новость</PageTitle>
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
          rules={[
            {
              required: true,
              message: 'Обязательное поле!',
            },
          ]}
        >
          <Input
            placeholder={'Ввведите название...'}
            maxLength={70}
          />
        </Form.Item>
        <Form.Item
          label={'Описание'}
          name={'description'}
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
          <DragAndDrop name={'img'}/>
        </Form.Item>
        <Form.Item>
          <Button type={'primary'} htmlType={'submit'}>
            Опубликовать
          </Button>
        </Form.Item>
      </Form>
    </ContentWrapper>
  );
}
