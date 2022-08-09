import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useEffect} from "react";
import {getGalleryById, updateGallery} from "../../../store/actions/gallery.action";
import {getBase64} from "../../../utils/getBase64";
import {ContentWrapper} from "../../common/contentWrapper/contentWrapper";
import {PageTitle} from "../../common/pageTitle/pageTitle";
import {Button, Form, Image} from "antd";
import {DragAndDrop} from "../../common/dragAndDrop/dragAndDrop";
import {Loader} from "../../common/loader/loader";

export const EditGallery = () => {
  const dispatch = useAppDispatch();

  const {id} = useParams();

  const {gallery, isLoading} = useAppSelector(state => state.galleryById);

  useEffect(() => {
    dispatch(getGalleryById(Number(id)));
  }, [dispatch, id]);

  const onFinish = async (values: any) => {
    const image = values.img ? await getBase64(values.img.file) : ''
    dispatch(updateGallery(Number(id), {
      img: image
    }))
  };

  return(
    gallery && !isLoading ? (
      <ContentWrapper>
        <PageTitle>Редактировать запись в галерее</PageTitle>
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
            <Image
              width={400}
              src={`${process.env.REACT_APP_API_URL}/${gallery.img}`}
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
    ) : <Loader alert={'Изображение загружается...'} description={'Подождите немного...'}/>
  );
};
