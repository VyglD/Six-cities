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

  wrapper.instance()._emailFieldRef.current.value = ``;
  wrapper.instance()._passwordFieldRef.current.value = ``;
  wrapper.find(`.login__submit`).simulate(`click`);
  expect(handleSumbitForm).toHaveBeenCalledTimes(0);

  wrapper.instance()._emailFieldRef.current.value = `randomValue`;
  wrapper.instance()._passwordFieldRef.current.value = `randomValue`;
  wrapper.find(`.login__submit`).simulate(`click`);
  expect(handleSumbitForm).toHaveBeenCalledTimes(0);

  wrapper.instance()._emailFieldRef.current.value = `random@mail`;
  wrapper.find(`.login__submit`).simulate(`click`);
  expect(handleSumbitForm).toHaveBeenCalledTimes(0);

  wrapper.instance()._emailFieldRef.current.value = `@mail.ru`;
  wrapper.find(`.login__submit`).simulate(`click`);
  expect(handleSumbitForm).toHaveBeenCalledTimes(0);

  wrapper.instance()._emailFieldRef.current.value = `random@mail.ru`;
  wrapper.instance()._passwordFieldRef.current.value = ``;
  wrapper.find(`.login__submit`).simulate(`click`);
  expect(handleSumbitForm).toHaveBeenCalledTimes(0);

  wrapper.instance()._emailFieldRef.current.value = `random@mail.ru`;
  wrapper.instance()._passwordFieldRef.current.value = `randomValue`;
  wrapper.find(`.login__submit`).simulate(`click`);
  expect(handleSumbitForm).toHaveBeenCalledTimes(1);
});
