import { useReducer, useEffect } from "react";
import moment from "moment";
const dataTes = [
  {
    order_id: "SO-921",
    created_at: "2018-02-17T03:24:12",
    customer: { id: 33, name: "Ari" },
    items: [
      { id: 24, name: "Sapu Lidi", qty: 2, price: 13200 },
      { id: 73, name: "Sprei 160x200 polos", qty: 1, price: 149000 }
    ]
  },
  {
    order_id: "SO-922",
    created_at: "2018-02-20T13:10:32",
    customer: { id: 40, name: "Ririn" },
    items: [
      { id: 83, name: "Rice Cooker", qty: 1, price: 258000 },
      { id: 24, name: "Sapu Lidi", qty: 1, price: 13200 },
      { id: 30, name: "Teflon", qty: 1, price: 190000 }
    ]
  },
  {
    order_id: "SO-923",
    created_at: "2018-02-28T15:20:43",
    customer: { id: 33, name: "Ari" },
    items: [
      { id: 303, name: "Pematik Api", qty: 1, price: 12000 },
      { id: 49, name: "Panci", qty: 2, price: 70000 }
    ]
  },
  {
    order_id: "SO-924",
    created_at: "2018-03-02T14:30:54",
    customer: { id: 40, name: "Ririn" },
    items: [{ id: 986, name: "TV LCD 40 inch", qty: 1, price: 6000000 }]
  },
  {
    order_id: "SO-925",
    created_at: "2018-03-03T14:52:22",
    customer: { id: 33, name: "Ari" },
    items: [
      { id: 1033, name: "Nintendo Switch", qty: 1, price: 4990000 },
      { id: 2003, name: "Macbook Air 11 inch 128 GB", qty: 1, price: 12000000 },
      { id: 23, name: "Pocari Sweat 600ML", qty: 5, price: 7000 }
    ]
  },
  {
    order_id: "SO-926",
    created_at: "2018-03-05T16:23:20",
    customer: { id: 58, name: "Annis" },
    items: [{ id: 24, name: "Sapu Lidi", qty: 3, price: 13200 }]
  }
];

function reducer(state, action) {
  const { type, purchased, foundAri, findTotal } = action;
  switch (type) {
    case "INIT":
      return {
        ...state
      };
    case "MERGE_SUCCESS":
      return {
        isLoading: false,
        isError: false,
        purchased,
        foundAri,
        findTotal
      };
    default:
      break;
  }
}

export default function MergeData() {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    isError: false,
    data: dataTes
  });

  useEffect(() => {
    dispatch({ type: "INIT" });
    function getData() {
      const purchased = purchasedByMonth(state.data);
      const foundAri = findAri(state.data);
      const findTotal = findTotalForEachPerson(state.data);
      dispatch({ type: "MERGE_SUCCESS", purchased, foundAri, findTotal });
    }
    getData();
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);

  if (!state.isError && !state.isLoading) {
    return (
      <React.Fragment>
        <h4>Hasil Nomor 5.1</h4>
        <p>{JSON.stringify(state.purchased)}</p>

        <h4>Hasil Nomor 5.2</h4>
        <p>{JSON.stringify(state.foundAri)}</p>

        <h4>Hasil Nomor 5.3</h4>
        <p>{JSON.stringify(state.findTotal)}</p>
      </React.Fragment>
    );
  } else return <span>Loading...</span>;
}

function purchasedByMonth(purchased) {
  const temp = [];
  purchased.forEach(item => {
    if (
      moment(item.created_at).year() === 2018 &&
      moment(item.created_at).month() === 2
    ) {
      temp.push(item);
    }
  });
  // console.log(temp);
  return temp;
}

function findAri(data) {
  let temp = data.filter(item => item.customer.name === "Ari");
  let price = [];
  temp.map(item => item.items.forEach(el => price.push(el.price)));

  const addReducer = (acc, currentValue) => acc + currentValue;
  let finalPrice = price.reduce(addReducer);
  return finalPrice;
}

function findTotalForEachPerson(data) {
  let tempPrice = [];
  let tempData = [];
  const addReducer = (acc, currentValue) => acc + currentValue;
  data.map(item =>
    item.items.forEach(el => {
      tempPrice.push(el.price);
      let finalPrice = tempPrice.reduce(addReducer);
      if (finalPrice < 300000) {
        console.log("OK");
        tempData.push(item);
      }
    })
  );

  let name = "";
  let noDuplicateArray = [];
  tempData.map(item => {
    name = item.customer.name;
    if (noDuplicateArray.length === 0) {
      noDuplicateArray.push(item);
    }
    noDuplicateArray.forEach(el => {
      if (el.customer.name !== name) {
        noDuplicateArray.push(item);
      }
    });
    name = "";
  });
  // console.log(noDuplicateArray);

  return noDuplicateArray;
}
