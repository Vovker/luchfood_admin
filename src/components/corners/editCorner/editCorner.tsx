import {ContentWrapper} from "../../common/contentWrapper/contentWrapper";
import {PageTitle} from "../../common/pageTitle/pageTitle";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {getCornerById, updateCorner} from "../../../store/actions/corners.action";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {getCornerTypes} from "../../../store/actions/cornerTypes.action";
import {Button, Form, Image, Input} from "antd";
import {SelectInput} from "../../common/select/select";
import {DragAndDrop} from "../../common/dragAndDrop/dragAndDrop";
import {Loader} from "../../common/loader/loader";
import {getBase64} from "../../../utils/getBase64";
import {CreateCornerTyped} from "../../../store/types/corners.types";
import {MenuCategories} from "./menuCategories/menuCategories";

export const EditCorner = () => {

  const dispatch = useAppDispatch();

  const {id} = useParams();

  useLayoutEffect(() => {
    dispatch(getCornerById(Number(id)));
    dispatch(getCornerTypes());
  }, [dispatch, id])

  const {corner, isLoading} = useAppSelector(state => state.cornersById);
  const {cornerTypes} = useAppSelector(state => state.cornerTypes);

  const onFinish = async (values: any) => {
    const logo = values.logo ? await getBase64(values.logo.file) : ''
    const mainImage = values.mainImage ? await getBase64(values.mainImage.file) : ''

    const data: CreateCornerTyped = {
      name: values.name,
      description: values.description,
      address: values.address,
      kitchenTypeId: values.kitchenTypeId,
      logo,
      mainImage
    }

    dispatch(updateCorner(Number(id), data));
  }

  return (
    <ContentWrapper>
      <PageTitle>Редактировать корнера</PageTitle>
      {
        corner && cornerTypes.length > 0 && !isLoading ? (
          <Form
            size={'middle'}
            layout={'vertical'}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              label={'Название'}
              name={'name'}
              initialValue={corner.name}
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
              label={'Логотип'}
            >
              <Image
                width={50}
                src={`${process.env.REACT_APP_API_URL}/${corner.logo}`}
                style={{marginBottom: '40px'}}
              />
              <DragAndDrop name={'logo'} required={false}/>
            </Form.Item>
            <Form.Item
              label={'Категория'}
            >
              <SelectInput options={cornerTypes} initialValue={corner.kitchenType.id} name={'kitchenTypeId'}/>
            </Form.Item>
            <Form.Item
              label={'Описание'}
              name={'description'}
              initialValue={corner.description}
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
              label={'Адрес'}
              name={'address'}
              initialValue={corner.address}
              rules={[
                {
                  required: true,
                  message: 'Обязательное поле!',
                },
              ]}
            >
              <Input
                placeholder={'Ввведите адрес...'}
                maxLength={50}
              />
            </Form.Item>
            <Form.Item
              label={'Основное изображение'}
            >
              <Image
                width={400}
                src={`${process.env.REACT_APP_API_URL}/${corner.mainImage}`}
                style={{marginBottom: '40px'}}
              />
              <DragAndDrop name={'mainImage'} required={false}/>
            </Form.Item>
            <Form.Item>
              <Button type={'primary'} htmlType={'submit'}>
                Обновить
              </Button>
            </Form.Item>
          </Form>
        ) : <Loader alert={'Событие загружается...'} description={'Подождите немного...'}/>
      }
      <MenuCategories id={Number(id)}/>
    </ContentWrapper>
  );
}
