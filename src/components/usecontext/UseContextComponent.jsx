import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const UserContext = React.createContext("");

export const UseContextComponent = () => {
  const [user, setUser] = useState("Arnold");

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setUser(res.data[0].name);
    });
  }, []);

  return (
    <UserContext.Provider value={user}>
      <Display />
    </UserContext.Provider>
  );
};

function Display() {
  return <DisplayName />;
}

function DisplayName() {
  const user = useContext(UserContext);
  return <div>Name: {user}</div>;
}
