import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { objects } from "../Reducer/objects";

export const store = createStore(objects, applyMiddleware(thunk));
