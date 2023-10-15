import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const FormValidation = () => {
  const name = useRef();
  const email = useRef();
  const message = useRef();
  const conditions = useRef();

  const [sentForm, setSentForm] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isFormValid, setFormValid] = useState(false);

  const validateForm = () => {
    const nameValue = name.current.value;
    const emailValue = email.current.value;
    const messageValue = message.current.value;
    const conditionsValue = conditions.current.checked;

    let newErrors = [];

    if (nameValue.trim() === "") {
      newErrors = [...newErrors, "Name is required"];
      name.current.style.borderColor='red'
    }
    else{
      name.current.style.borderColor=''
    }
    if (emailValue.trim() === "") {
      newErrors = [...newErrors, "Email is required"];
      email.current.style.borderColor='red'
    } else if (!emailValue.match(/^[a-z.]+[a-z0-9]*\@[a-z]+\.[a-z]{2,}$/)) {
      newErrors = [...newErrors, "Email is invalid"];
      email.current.style.borderColor='red'
    }
    else{
      email.current.style.borderColor=''
    }
    if (messageValue.trim() === "") {
      newErrors = [...newErrors, "Message is required"];
      message.current.style.borderColor='red'
    }
    else{
      message.current.style.borderColor=''
    }
    if (!conditionsValue) {
      newErrors = [...newErrors, "You must accept the conditions"];
      conditions.current.style.borderColor = 'red';
    }else{
      conditions.current.style.borderColor = '';
    }

    setErrors(newErrors);
    setFormValid(newErrors.length === 0);
  
    // Check if there are new errors, and reset sentForm if there are errors
    if (newErrors.length > 0) {
      setSentForm(false);
    }
  };

  const formReset = () => {
    name.current.value = "";
    email.current.value = "";
    message.current.value = "";
    conditions.current.checked = false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nameValue = name.current.value;
    const emailValue = email.current.value;
    const messageValue = message.current.value;
    const conditionsValue = conditions.current.checked;

    console.log(nameValue, emailValue, messageValue, conditionsValue);
    validateForm();

    if (isFormValid) {
      setSentForm(true);
      formReset();
    }
  };

  return (
    <div className="container-fluid w-75 mx-auto my-3">
      {errors.length > 0 && (
        <div className="alert alert-danger" role="alert">
          <strong>Please fill out this form correctly</strong>
          <ul>
            {errors.map((error, i) => {
              return <li key={i}>{error}</li>;
            })}
          </ul>
        </div>
      )}
      {sentForm ? (
        <div className="alert alert-success" role="alert">
          <strong>Form has been sent successfully</strong>
        </div>
      ) : (
        ""
      )}

      <form onSubmit={handleSubmit}>
        <h1>Contact Form</h1>
        <hr />
        <div className="form-group my-2">
          <label htmlFor="name">Name :</label>
          <input type="text" id="name" className="form-control" ref={name} />
        </div>
        <div className="form-group my-2">
          <label htmlFor="email">Email address :</label>
          <input type="text" id="email" className="form-control" ref={email} />
        </div>
        <div className="form-group my-2">
          <label htmlFor="message">Message :</label>
          <textarea
            style={{ resize: "none", overflowY: "scroll" }}
            id="message"
            className="form-control"
            cols="10"
            rows="5"
            ref={message}
          ></textarea>
        </div>
        <div className="form-group-check my-3">
          <input
            className="form-check-input"
            id="conditions"
            type="checkbox"
            ref={conditions}
          />
          <label className="form-check-label mx-2" htmlFor="conditions">
            Accept conditions
          </label>
        </div>
        <input type="submit" value="Submit" className="btn btn-primary my-2" />
      </form>
    </div>
  );
};

export default FormValidation;
