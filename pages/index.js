import { useReducer } from "react";
import { Row, Col, Radio } from "antd";
import ContactList from "../components/Contact-List";
import ContactAdd from "../components/Contact-Add";

function hasilReducer(state, action) {
  const { type } = action;
  switch (type) {
    case 1:
      return {
        value: 1,
        component: <ContactList />
      };
    case 2:
      return {
        value: 2,
        component: <ContactAdd />
      };
    case 3:
      return { value: 3, component: <h1>Belum ada Hasil</h1> };
    case 4:
      return { value: 4, component: <h1>Belum ada Hasil</h1> };
    case 5:
      return {
        value: 5,
        component: (
          <React.Fragment>
            <p>Soal Nomor 5</p>
            {/* <Lima /> */}
          </React.Fragment>
        )
      };

    default:
      break;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(hasilReducer, {
    value: 1,
    component: <ContactList />
  });

  function handleChange(e) {
    dispatch({ type: e.target.value });
  }

  return (
    <div style={{ margin: "100px 20px" }}>
      <Radio.Group onChange={handleChange} value={state.value}>
        <Radio value={1} style={{ marginRight: 15 }}>
          Contact List
        </Radio>
        <Radio value={2} style={{ marginRight: 15 }}>
          Add Contact
        </Radio>
        <Radio value={3} style={{ marginRight: 15 }}>
          Edit Contact
        </Radio>
        <Radio value={4} style={{ marginRight: 15 }}>
          Delete Contact
        </Radio>
      </Radio.Group>
      <Row>
        <Col span={24}>{state.component}</Col>
      </Row>
    </div>
  );
}
