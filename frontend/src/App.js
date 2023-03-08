import {useState, useMemo, useEffect} from "react";

import Router from "./Router.jsx";
import ModalViewer from "./ModalViewer.jsx";
import ModalContext from "./ModalContext.jsx";
import UserContext from "./UserContext.jsx";
import Header from "./components/Header";

function App() {
  const [user, setUser] = useState(null);
  const loginUser = (newUser) => {
    setUser(newUser);
    sessionStorage.setItem("user", JSON.stringify(newUser));
  };
  const userProvider = useMemo(() => ({user, loginUser}), [user, loginUser]);

  const [modal, setModal] = useState(null);
  const modalProvider = useMemo(() => ({modal, setModal}), [modal, setModal]);

  //Sync user state with session
  useEffect(() => {
    if (sessionStorage.getItem("user") !== null) {
      const newUser = JSON.parse(sessionStorage.getItem("user"));
      setUser(newUser);
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={userProvider}>
        <ModalContext.Provider value={modalProvider}>

          <Header/>

          <main className={"container"}>
            <Router/>
          </main>

          {
            modal &&
            <ModalViewer/>
          }

        </ModalContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
