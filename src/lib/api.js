// src/lib/api.js
import axios from "axios";
axios.defaults.withCredentials = true;
// For session cookies
axios.defaults.baseURL = "http://localhost/php-crud/api";
