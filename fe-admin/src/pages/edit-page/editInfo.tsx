import useAction from "../../redux/useActions";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Input } from "antd";

const EditInfo = () => {
  const [form] = Form.useForm();
  const actions = useAction();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user_info);
  const hanldeValuesChange = () => {
    let infoUpdate = { ...form.getFieldsValue(), userId: user?.userId };
    dispatch(actions.AuthActions.updateUserInfo(infoUpdate));
  };
  const hanldeClick = () => {
    dispatch(actions.AuthActions.updateUserInfoSuccess());
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      autoComplete="off"
      onValuesChange={hanldeValuesChange}
    >
      <Form.Item
        label="Name"
        name="displayName"
        initialValue={user?.displayName}
      >
        <Input placeholder="Hay Nhap ten" />
      </Form.Item>
      <Form.Item label="photo" name="photoURL">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" onClick={hanldeClick}>
          submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditInfo;
