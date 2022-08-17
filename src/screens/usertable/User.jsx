import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./user.css";
// import { Table } from "../../components/table/Table";
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
        id: "Id",
        accessorKey: "id",
      },
      {
        id: "Name",
        accessorKey: "name",
      },
      {
        id: "UserName",
        accessorKey: "username",
      },
      {
        id: "Email",
        accessorKey: "email",
      },
      {
        id: "Actions",
        cell: (row) => (
          <>
            <button>Delete</button>
            <button>Edit</button>
          </>
        ),
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
      <ReactTable
        columns={columns}
        data={data}
        filter={(value) => {
          console.log("filter from backend", value);
        }}
        isFilterable={true}
        isExportable={true}
      />
    </>
  );
};

export default User;
