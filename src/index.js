import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {createAPI} from "./services/api";
import App from "./components/app/app";
import {reducer} from "./store/reducer";
import {fetchOffersList} from "./store/api-actions";

const api = createAPI(() => {});

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

Promise.resolve(
    store.dispatch(fetchOffersList())
)
.then(() => {
  ReactDOM.render(
      (
        <Provider store={store}>
          <App />
        </Provider>
      ),
      document.querySelector(`#root`)
  );
});

