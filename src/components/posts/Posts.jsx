/**
 * presents user posts in table format
 * fetch from
 */
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./posts.css";
import Pagination from "../pagination/Pagination";
import { Table } from "../table/Table";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredPosts, setFilterPosts] = useState([]);
  const [filterActivate, setFilterActivate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);
  const [options, setOptions] = useState([5, 10, 20, 25]);

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "body",
      },
    ],
    []
  );

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      console.log(response.data);
      setPosts(response.data);
    });
  }, []);

  let indexOfLastPost = currentPage * postsPerPage;
  let indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>My Posts</h1>
      <Table
        columns={columns}
        data={filterActivate ? filteredPosts : currentPosts}
        className={""}
        showGlobalFilter={true}
      />
      <Pagination
        setRowsPerPage={(newvalue) => setPostPerPage(newvalue)}
        currentPage={currentPage}
        rowsPerPage={postsPerPage}
        options={options}
        totalRows={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Posts;
