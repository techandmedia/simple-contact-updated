import { useReducer, useEffect } from "react";
import { List, Icon, Avatar } from "antd";
import axios from "axios";

const URL_LIST = "https://simple-contact-crud.herokuapp.com/contact";

function reducer(state, action) {
  const { type, data } = action;
  switch (type) {
    case "INIT":
      return {
        ...state
      };
    case "FETCH_SUCCESS":
      return {
        isLoading: false,
        isError: false,
        data
      };
    default:
      break;
  }
}

export default function MergeData() {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    isError: false,
    data: []
  });

  useEffect(() => {
    dispatch({ type: "INIT" });
    async function getData() {
      const USERS = await axios.get(URL_LIST);
      dispatch({ type: "FETCH_SUCCESS", data: USERS.data.data });
    }
    getData();
  }, []);

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

  if (!state.isError && !state.isLoading) {
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3
        }}
        dataSource={state.data}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <IconText type="star-o" text="156" key="list-vertical-star-o" />,
              <IconText type="like-o" text="156" key="list-vertical-like-o" />,
              <IconText type="message" text="2" key="list-vertical-message" />
            ]}
            extra={<img width={272} alt="logo" src={item.photo} />}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.photo} />}
              title={
                <a href={item.href}>{item.firstName + " " + item.lastName}</a>
              }
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    );
  } else return <span>Loading...</span>;
}

function reformData(USERS, POSTS) {
  const temp = [];
  USERS.map(user => {
    POSTS.map(post => {
      user.id === post.userId ? temp.push({ ...post, user: user }) : null;
    });
  });

  // console.log(temp);
  return temp;
}
