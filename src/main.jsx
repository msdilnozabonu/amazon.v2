import React from 'react';
import ReactDOM from 'react-dom/client';
import "slick-carousel/slick/slick.css"; 
import {Provider} from "react-redux"
import {store, persistor} from "./redux/store"
import './index.css';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react'
import firebaseConfig from './firebase.config';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={"loading"} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);