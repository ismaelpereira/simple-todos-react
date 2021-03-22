import { Meteor } from "meteor/meteor";
import React, { useState, useRef, Fragment } from "react";
import { Modal } from "./Modal";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(email, password, function (error) {
      if (error !== undefined) {
        alert(error);
      }
    });
  };

  return !openModal ? (
    <Fragment>
      <form onSubmit={submit} className="login-form">
        <label htmlFor="email">e-mail</label>
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
        <br />
        <button onClick={() => setOpenModal(!openModal)}>Register</button>
      </form>
    </Fragment>
  ) : (
    <Modal />
  );
};
