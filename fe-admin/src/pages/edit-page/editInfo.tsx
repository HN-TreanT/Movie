import useAction from "../../redux/useActions";
import { serverConfig } from "../../const";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Input, Upload } from "antd";

const EditInfo = () => {
  const [form] = Form.useForm();
  const actions = useAction();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.auth.user_info);
  const hanldeClick = async () => {
    console.log(form.getFieldsValue().photoURL?.file);
    const formData = new FormData();
    formData.append("photoURL", form.getFieldsValue().photoURL?.file);
    formData.append("displayName", form.getFieldsValue().displayName);
    formData.append("photoURlOld", userInfo?.photoURL);
    await dispatch(actions.AuthActions.updateUserInfo(formData));
  };
  return (
    <>
      {userInfo?.photoURL ? (
        <img src={`${serverConfig.server}${userInfo?.photoURL}`} alt="" />
      ) : (
        <h1>not image</h1>
      )}
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
        encType="multipart/form-data"
      >
        <Form.Item
          label="Name"
          name="displayName"
          initialValue={userInfo?.displayName}
        >
          <Input placeholder="Hay Nhap ten" />
        </Form.Item>
        <Form.Item label="photo" name="photoURL">
          <Upload.Dragger
            multiple
            accept=".png,.jpeg,.doc"
            action="http://localhost:3000/app/edit_page"
            listType="picture"
            showUploadList={true}
            beforeUpload={(file) => {
              console.log("check file--->", { file });
              return false;
            }}
          >
            <Button>Upload</Button>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={hanldeClick}>
            submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditInfo;
