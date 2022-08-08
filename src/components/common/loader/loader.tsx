import React from "react";
import {LoaderTyped} from "./loader.types";
import { Alert, Spin } from 'antd';

export const Loader: React.FC<LoaderTyped> = ({alert, description}) => {
  return(
    <Spin tip="Загрузка...">
      <Alert
        message={alert}
        description={description}
        type="info"
      />
    </Spin>
  );
}
