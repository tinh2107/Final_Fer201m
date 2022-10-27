import React, { Component, useState } from "react";

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PhoneForm from "./PhoneFormComponent";
import PhoneList from "./PhoneListComponent";
// import PHONES from "../shared/phones";

function Main() {
  const [phone, setPhone] = useState({
    id: "",
    model: "",
    price: "",
    date: "",
  });

  const [phoneList, setPhoneList] = useState(() => {
    const storage = JSON.parse(localStorage.getItem("phones"));
    return storage ? storage : [];
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPhone((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };
  const handleSubmit = (event) => {
    const newPhone = {
      id: phoneList.length + 1,
      model: phone.model,
      price: phone.price,
      date: phone.date,
    };

    setPhoneList((prevValue) => {
      const tempPhoneList = [...prevValue, newPhone];
      localStorage.setItem("phones", JSON.stringify(tempPhoneList));
      return tempPhoneList;
    });
    // setPhone({
    //   id: "",
    //   model: "",
    //   price: "",
    //   date: "",
    // });
    event.preventDefault();
  };

  console.log(phoneList);

  return (
    <div>
      <PhoneForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        phone={phone}
      />
      <PhoneList phoneList={phoneList} />
    </div>
  );
}

export default Main;
