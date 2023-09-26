import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

axios.defaults.baseURL = 'https://second-mern-app.onrender.com/api';
// axios.defaults.baseURL = 'http://localhost:3001/api';
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <App/>
  </BrowserRouter>,
)
