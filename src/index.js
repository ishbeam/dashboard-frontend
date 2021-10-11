import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import App from './App';  
import registerServiceWorker from './registerServiceWorker';
   
// base web dependencies
import {BaseProvider, LightTheme, DarkTheme} from 'baseui';
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
const engine = new Styletron();


ReactDOM.render(
	<StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>
		  <App />
    </BaseProvider>
  </StyletronProvider>,
	document.getElementById('root'));
registerServiceWorker();
