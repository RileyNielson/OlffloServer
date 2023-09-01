import * as React from "react";
import { useState } from "react";
import Layout from "../pages/layout";
import Home from "../pages/home";
import NoPage from "../pages/nopage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OlffloApp from "../pages/olffloApp";
import Login from "../pages/login";
import SignUp from "../pages/signUp";

function App() {
  const [user, setUser] = useState(null);
  const [project, setProject] = useState([]);

  // console.log(user);

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Home
                loggedIn={user !== null ? true : false}
                setUser={setUser}
                user={user}
                setProject={setProject}
                project={project}
              />
            }
          />
          <Route path="login" element={<Login setUser={setUser} />} />
          <Route path="signUp" element={<SignUp setUser={setUser} />} />
          <Route
            path="olffloApp"
            element={
              <OlffloApp
                user={user}
                project={project}
                setProject={setProject}
                setUser={setUser}
              />
            }
          />
          <Route path="*" element={<NoPage />} />
        </Route>
        {/* <Route exact path="/" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
