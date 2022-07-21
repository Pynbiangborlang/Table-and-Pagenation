import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./user.css";
import { Table } from "../../components/table/Table";
import ReactTable from "../../components/tanstacktable/ReactTable";

const User = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setUserData(res.data);
    });
  }, []);

  const columns = useMemo(
    () => [
      {
        header: "Id",
        accessorKey: "id",
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "UserName",
        accessorKey: "username",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
    ],
    []
  );

  const data = useMemo(() => userData, [userData]);
  return (
    <>
      <h1>Users Details</h1>
      {/* <Table
        columns={columns}
        data={data}
        showGlobalFilter={true}
        className=""
      /> */}
      <ReactTable columns={columns} data={data} />
    </>
  );
};

export default User;
