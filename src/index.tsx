import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './global.scss';

import { Main } from './components/Main/Main';

ReactDOM.render(
    <Main />,
    document.getElementById("render-container")
);