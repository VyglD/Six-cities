import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {createAPI} from "./services/api";
import App from "./components/app/app";
import rootReducer from "./store/root-reducer";
import {fetchOffersList, checkAuth} from "./middlewares/thunk-api";
import {redirect} from "./middlewares/redirect";

const api = createAPI();

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(redirect)
    )
);

Promise.all([
  store.dispatch(fetchOffersList()),
  store.dispatch(checkAuth())
])
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
