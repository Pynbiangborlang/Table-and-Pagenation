import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./user.css";
import { Table } from "../table/Table";

const User = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      console.log(res.data);
      setUserData(res.data);
    });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "UserName",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email",
      },
    ],
    []
  );

  const data = useMemo(() => userData, [userData]);
  return (
    <>
      <h1>Users Details</h1>
      <Table
        columns={columns}
        data={data}
        showGlobalFilter={true}
        className=""
      />
    </>
  );
};

export default User;
