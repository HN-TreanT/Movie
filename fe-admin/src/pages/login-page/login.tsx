import { Form, Input, Button, Spin } from "antd";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useAction from "../../redux/useActions";
import { RouterLinks } from "../../const";
const LoginPage = () => {
  const [form] = Form.useForm();
  const actions = useAction();
  const dispatch = useDispatch();
  const loginInfo = useSelector((state: any) => state.auth.login_info);
  const userInfo = useSelector((state: any) => state.auth.user_info);
  const token = useSelector((state: any) => state.auth.token);
  const isLoaing = useSelector((state: any) => state.state.loadingState);
  const hanldeValuesChange = () => {
    dispatch(actions.AuthActions.updateLoginInfo(form.getFieldsValue()));
  };
  const handleSubmit = () => {
    dispatch(actions.AuthActions.loadAccessToken());
  };
  localStorage.clear();
  if (token) {
    localStorage.setItem("token", token);
    localStorage.setItem("username", userInfo.username);
    return <Navigate to={RouterLinks.HOME_PAGE} />;
  }

  return (
    <Spin spinning={isLoaing} size="large" style={{ position: "static" }}>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
        onValuesChange={hanldeValuesChange}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please inout your username!" }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please inout your password!" }]}
        >
          <Input.Password></Input.Password>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default LoginPage;
