import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
//import {store} from './redux/store/store.js'
import {Provider} from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider >
  <BrowserRouter>
 
    <App />
  
  </BrowserRouter>
  </Provider>,
)

//store={store}
