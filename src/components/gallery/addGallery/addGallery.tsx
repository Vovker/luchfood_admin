import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {getBase64} from "../../../utils/getBase64";
import {ContentWrapper} from "../../common/contentWrapper/contentWrapper";
import {PageTitle} from "../../common/pageTitle/pageTitle";
import {Button, Form} from "antd";
import {DragAndDrop} from "../../common/dragAndDrop/dragAndDrop";
import {createGallery} from "../../../store/actions/gallery.action";

export const AddGallery = () => {
  const dispatch = useAppDispatch();

  const onFinish = async (values: any) => {
    const img = await getBase64(values.img.file).then(x => x);

    dispatch(createGallery({img}))
  }

  return (
    <ContentWrapper>
      <PageTitle>Добавить фото в галерею</PageTitle>
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
};
