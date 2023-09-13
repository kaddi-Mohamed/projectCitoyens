import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import Register from "views/Register";
import { token } from "service/authService";
import AddUser from "views/AddUser";
import { checkTokenExpiration } from "service/authService";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { logout } from "service/authService";
import IdeaDetail from "views/IdeaDetail";

function App() {
  const [isExpire, setIsExpire] = useState(false);
  useEffect(() => {
    setIsExpire(checkTokenExpiration());
  }, [isExpire]);
  return (
    <BrowserRouter>
      <Switch>
        {token ? (
          <>
            <Route path="/" render={(props) => <AdminLayout {...props} />} />
          </>
        ) : (
          <>
            <Route path="/login" component={Register} />
            <Redirect from="/" to="/login" />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
