import { Form, Input, Button } from "antd";
import axios from "axios";

const formItemLayout = {
  labelCol: {
    xs: { span: 16 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 10 },
    sm: { span: 8 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

function RegistrationForm({ form }) {
  const { getFieldDecorator, validateFieldsAndScroll } = form;

  function handleSubmit(e) {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        axios
          .post("https://simple-contact-crud.herokuapp.com/", {
            firstName: values.first_name,
            lastName: values.last_name,
            age: values.age,
            photo:
              "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550"
          })
          .then(item => console.log(item));
      }
    });
  }

  const items = [
    {
      key: 1,
      label: "First Name",
      field: "first_name",
      required: true,
      component: <Input />
    },
    {
      key: 2,
      label: "Last Name",
      field: "last_name",
      required: true,
      component: <Input />
    },
    {
      key: 3,
      label: "Age",
      field: "age",
      component: <Input />
    }
  ];

  return (
    <React.Fragment>
      <h1 style={{ textAlign: "center", margin: 15 }}>Add Contact</h1>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        {items.map(item => (
          <Form.Item label={item.label} key={item.key}>
            {getFieldDecorator(item.field, {
              rules: [
                {
                  required: item.required
                }
              ]
            })(item.component)}
          </Form.Item>
        ))}

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);
export default WrappedRegistrationForm;
