import "core-js/stable";
import "regenerator-runtime/runtime";

import Login from "../Frontend/modules/Login";

const register = new Login(".registration-form");
const login = new Login(".login-form");

register.init()
login.init()