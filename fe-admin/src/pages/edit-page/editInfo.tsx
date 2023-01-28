import useAction from "../../redux/useActions";
import { serverConfig } from "../../const";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Input, Upload } from "antd";
import axios from "axios";

const EditInfo = () => {
  const [form] = Form.useForm();
  const actions = useAction();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user_info);
  const hanldeValuesChange = () => {
    //  let infoUpdate = { ...form.getFieldsValue(), userId: user?.userId };
    let infoUpdate = {
      photoURL: form.getFieldsValue().photoURL?.file,
      userId: user?.userId,
      displayName: form.getFieldsValue().displayName,
    };
    console.log(infoUpdate);
    // console.log(infoUpdate);

    // const infoUpdate = {
    //   userId: user?.userId,
    //   photoURL: formData,
    // };
    //formData.append("displayName", form.getFieldsValue().displayName);
    // let infoUpdate = formData;
    // console.log(formData);
    //console.log(infoUpdate);
    // const formData = new FormData();
    // formData.append("photoURL", form.getFieldsValue().file);

    dispatch(actions.AuthActions.updateUserInfo(infoUpdate));
  };
  const hanldeClick = async () => {
    // console.log("check->>" + form.getFieldsValue());
    // console.log("check-->" + form.getFieldsValue().photoURL?.file);
    const formData = new FormData();
    formData.append("photoURL", form.getFieldsValue().photoURL?.file);
    formData.append("userId", user?.userId);
    formData.append("displayName", form.getFieldsValue().displayName);
    const message = await axios.patch(
      serverConfig.server + "/api/v1/editUser",
      formData
    );
    console.log(message);

    //dispatch(actions.AuthActions.updateUserInfoSuccess());
    // console.log(form.getFieldsValue().photoURL.file);
  };
  // const handleChange = (e: any) => {
  //   console.log(e.target.files[0]);
  // };
  console.log(user);
  return (
    <>
      <img src={`${serverConfig.server}${user.photoURL}`} alt="" />
      {/* <img
        src="data:image/jpeg;base64,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"
        alt=""
      /> */}
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
        onValuesChange={hanldeValuesChange}
        encType="multipart/form-data"
      >
        <Form.Item
          label="Name"
          name="displayName"
          initialValue={user?.displayName}
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
              console.log({ file });
              return false;
            }}
          >
            <Button>Upload</Button>
          </Upload.Dragger>

          {/* <Input onChange={handleChange} type="file"></Input> */}
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
