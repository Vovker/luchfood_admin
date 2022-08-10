import {ContentWrapper} from "../../common/contentWrapper/contentWrapper";
import {PageTitle} from "../../common/pageTitle/pageTitle";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useLayoutEffect} from "react";
import {getCornerTypes} from "../../../store/actions/cornerTypes.action";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {Button, Form, Input} from "antd";
import {SelectInput} from "../../common/select/select";
import {DragAndDrop} from "../../common/dragAndDrop/dragAndDrop";
import {Loader} from "../../common/loader/loader";
import {getBase64} from "../../../utils/getBase64";
import {CreateCornerTyped} from "../../../store/types/corners.types";
import {createCorner} from "../../../store/actions/corners.action";

export const AddCorner = () => {

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(getCornerTypes());
  }, [dispatch]);

  const {cornerTypes, isLoading} = useAppSelector(state => state.cornerTypes)

  const onFinish = async (values: any) => {
    const logo = await getBase64(values.logo.file).then(x => x);
    const mainImage = await getBase64(values.mainImage.file).then(x => x);

    const data: CreateCornerTyped = {
      name: values.name,
      description: values.description,
      address: values.address,
      kitchenTypeId: values.kitchenTypeId,
      logo,
      mainImage
    }

    dispatch(createCorner(data));
  }

  return(
    <ContentWrapper>
      <PageTitle>Добавить корнера</PageTitle>
      {
        !isLoading && cornerTypes.length > 0  ?
          <Form
            size={'large'}
            layout={'vertical'}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 10,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              label={'Название корнера'}
              name={'name'}
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
              label={'Тип кухни'}
            >
              <SelectInput options={cornerTypes} name={'kitchenTypeId'}/>
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
                placeholder={"Введите короткое описание корнера..."}
                maxLength={280}
                rows={5}
              />
            </Form.Item>
            <Form.Item
              label={'Адрес'}
              name={'address'}
              rules={[
                {
                  required: true,
                  message: 'Обязательное поле!',
                },
              ]}
            >
              <Input
                placeholder={"Введите адрес (номер блока)..."}
                maxLength={50}
              />
            </Form.Item>
            <Form.Item
              label={'Логотип'}
            >
              <DragAndDrop name={'logo'} required/>
            </Form.Item>
            <Form.Item
              label={'Основное изображение'}
            >
              <DragAndDrop name={'mainImage'} required/>
            </Form.Item>
            <Form.Item>
              <Button type={'primary'} htmlType={'submit'}>
                Опубликовать
              </Button>
            </Form.Item>
          </Form>
          : <Loader alert={'Загружаем данные'} description={'Подождите немного...'}/>
      }
    </ContentWrapper>
  );
}
