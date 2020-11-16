import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {LoginForm} from "./login-form";

configure({adapter: new Adapter()});

it(`Checking correction of submit data in LoginForm`, () => {
  const handleSumbitForm = jest.fn();

  const wrapper = mount(
      <LoginForm
        logIn={handleSumbitForm}
      />
  );


  const container = wrapper.find(`.login__form`).instance();
  const emailField = container.querySelector(`[name=email]`);
  const passwordField = container.querySelector(`[name=password]`);

  emailField.value = ``;
  passwordField.value = ``;
  wrapper.find(`.login__submit`).simulate(`click`);
  expect(handleSumbitForm).toHaveBeenCalledTimes(0);

  emailField.value = `randomValue`;
  passwordField.value = `randomValue`;
  wrapper.find(`.login__submit`).simulate(`click`);
  expect(handleSumbitForm).toHaveBeenCalledTimes(0);

  emailField.value = `random@mail`;
  wrapper.find(`.login__submit`).simulate(`click`);
  expect(handleSumbitForm).toHaveBeenCalledTimes(0);

  emailField.value = `@mail.ru`;
  wrapper.find(`.login__submit`).simulate(`click`);
  expect(handleSumbitForm).toHaveBeenCalledTimes(0);

  emailField.value = `random@mail.ru`;
  passwordField.value = ``;
  wrapper.find(`.login__submit`).simulate(`click`);
  expect(handleSumbitForm).toHaveBeenCalledTimes(0);

  emailField.value = `random@mail.ru`;
  passwordField.value = `randomValue`;
  wrapper.find(`.login__submit`).simulate(`click`);
  expect(handleSumbitForm).toHaveBeenCalledTimes(1);
});
