import {Button, Form, Input} from "antd";
import {PageTitle} from "../../common/pageTitle/pageTitle";
import {ContentWrapper} from "../../common/contentWrapper/contentWrapper";
import {DragAndDrop} from "../../common/dragAndDrop/dragAndDrop";

export const AddNews = () => {

  const onFinish = (values: any) => {

  }

  const onFinishFailed = (values: any) => {

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
        onFinishFailed={onFinishFailed}
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
