import React, { Fragment, useState } from "react";
import { Meteor } from "meteor/meteor";
import { LoginForm } from "./LoginForm";

export const Modal = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [closeModal, setCloseModal] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    Accounts.createUser({
      email: email,
      password: password,
    });
    if (password !== confirmPassword) {
      alert("Password do not match");
      Meteor.Error("Password do not match");
    }
    Meteor.users.find().fetch();
  };

  return !closeModal ? (
    <Fragment>
      <form className="modal-form">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" onClick={submit}>
          Register
        </button>
        <br />
        <button type="submit" onClick={() => setCloseModal(!closeModal)}>
          Cancel
        </button>
      </form>
    </Fragment>
  ) : (
    <LoginForm />
  );
};
