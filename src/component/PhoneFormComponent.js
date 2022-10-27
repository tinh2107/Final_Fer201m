import React, { Component, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

function PhoneForm({ handleSubmit, handleChange, phone }) {
  // touched
  const [touched, setTouched] = useState({
    model: false,
    price: false,
    date: false,
  });
  // create blur event handlers
  const handleBlur = (field) => (evt) => {
    console.log(field);
    console.log(evt.target.value);
    setTouched({ ...touched, [field]: true });
  };

  const validate = (model, price, date) => {
    const errors = {
      model: "",
      price: "",
      date: "",
    };
    if (touched.model && model.length < 3) {
      errors.model = "Model must be at least 3 characters";
    }
    // check if price is a number
    if (touched.price && isNaN(price)) {
      errors.price = "Price must be a number";
    }

    // check if date is a valid date
    if (touched.date && isNaN(Date.parse(date))) {
      errors.date = "Please input date!";
    }
    // check if the fisrt letter of model is uppercase
    if (touched.model && model.charAt(0) !== model.charAt(0).toUpperCase()) {
      errors.model = "Model must start with an uppercase letter";
    }
    // check if model is blank
    if (touched.model && model.length === 0) {
      errors.model = "Model must not be blank";
    }

    // check if price is blank
    if (touched.price && price.length === 0) {
      errors.price = "Price must not be blank";
    }

    return errors;
  };
  console.log(touched);
  const errorModel = validate(phone.model, phone.price, phone.date).model;
  console.log(errorModel);
  const errorPrice = validate(phone.model, phone.price, phone.date).price;
  const errorDate = validate(phone.model, phone.price, phone.date).date;
  const validateToDisable = () => {
    const err = validate(phone.model, phone.price, phone.date);
    if (phone.model === "" || phone.price === "" || phone.date === "") {
      err.date = "errorDate";
      err.model = "errorModel";
      err.price = "errorPrice";
    }
    return err;
  };
  //   disable Submit button if there are errors
  const errors = validateToDisable();
  const isDisabled = Object.keys(errors).some((x) => errors[x]);
  console.log("Err:" + errors);
  console.log(isDisabled);
  console.log(errorModel);
  console.log(errorDate);
  console.log(errorPrice);

  const [isPhoneFormModalOpen, setIsPhoneFormModalOpen] = useState(false);
  const togglePhoneFormModal = () => {
    setIsPhoneFormModalOpen(!isPhoneFormModalOpen);
  };
  console.log(isPhoneFormModalOpen);

  const handleSubmitModal = () => {
    togglePhoneFormModal();
  };

  const handleCloseModal = () => {
    togglePhoneFormModal();
    window.location.reload();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className="form-group">
          <Col md={2}>
            <Label for="model">Model</Label>
          </Col>
          <Col md={10}>
            <Input
              type="text"
              name="model"
              id="model"
              placeholder="Enter phone Model"
              onBlur={handleBlur("model")}
              value={phone.model}
              valid={errorModel === ""}
              invalid={errorModel !== ""}
              onChange={handleChange}
            />
          </Col>
          <p className="error-feedback">{errorModel}</p>
        </Row>
        <Row className="form-group">
          <Col md={2}>
            <Label for="price">Price</Label>
          </Col>
          <Col md={10}>
            <Input
              type="text"
              name="price"
              id="price"
              placeholder="Enter phone price"
              onBlur={handleBlur("price")}
              value={phone.price}
              valid={errorPrice === ""}
              invalid={errorPrice !== ""}
              onChange={handleChange}
            />
          </Col>
          <p className="error-feedback">{errorPrice}</p>
        </Row>
        <Row className="form-group">
          <Col md={2}>
            <Label for="date">Date</Label>
          </Col>
          <Col md={10}>
            <Input
              type="date"
              name="date"
              id="date"
              placeholder="Enter phone date"
              onBlur={handleBlur("date")}
              value={phone.date}
              valid={errorDate === ""}
              invalid={errorDate !== ""}
              onChange={handleChange}
            />
          </Col>
          <p className="error-feedback">{errorDate}</p>
        </Row>
        <Button
          color="primary"
          type="submit"
          disabled={isDisabled}
          onClick={handleSubmitModal}
        >
          Submit
        </Button>
      </Form>

      <React.Fragment>
        <Modal isOpen={isPhoneFormModalOpen} onSubmit={togglePhoneFormModal}>
          <ModalHeader>Succesfully Added</ModalHeader>
          <ModalBody>
            <p>Model: {phone.model}</p>
            <p>Price: {phone.price}</p>
            <p>Date: {phone.date}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleCloseModal}>
              OK
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    </>
  );
}

export default PhoneForm;
