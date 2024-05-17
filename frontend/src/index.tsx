/****************************************************************
 * Copyright (c) 2023-2024 Dmytro Ostapenko. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *****************************************************************/

import React from 'react';
import ReactDOM from 'react-dom/client';
import './theme/theme.css';
import App from './App';
import {Provider} from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}> {/* Init Redux store, so I don't need to use useState hooks and pass state setters as a props. It will make code more clean and understandable */}
        <App />
    </Provider>,
);

// Let's optimize the loading of the CSS and third-party libraries by loading them asynchronously
// It will reduce the first content paint time and improve the user experience
function loadStylesheet(path : string) {
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = path;
    link.media = 'all';

    document.head.appendChild(link);
}

// Load material fonts: Roboto font as a default typeface and Material symbols, so I don't need to use images for icons reducing the number of requests,
// and the overall size of the application
loadStylesheet('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
loadStylesheet('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
