import React from "react";

import { FaSearch, FaSlidersH } from "react-icons/fa";

import { Form, InputGroup, Dropdown } from "react-bootstrap";

import { Link } from "react-router-dom";

export default function SearchBar() {
  return (
    <InputGroup
      className="mx-auto my-4"
      style={{
        width: "60%",

        maxWidth: "500px",

        borderRadius: "15px",

        background: "rgba(255, 255, 255, 0.5)",

        backdropFilter: "blur(10px)",

        boxShadow: "inset 0 0 5px rgba(255, 255, 255, 0.5)",

        // overflow: "hidden",
      }}
    >
      <InputGroup.Text
        style={{
          background: "transparent",

          border: "none",

          color: "#fff",
        }}
      ></InputGroup.Text>

      <Form.Control
        className="mt-1 mb-1"
        type="text"
        placeholder="Search (eg: video editing )"
        style={{
          background: "#ebe2f4",

          border: "none",

          borderRadius: "10px",
        }}
      />

      <InputGroup.Text
        style={{
          background: "transparent",

          border: "none",

          color: "#fff",
        }}
      >
        <Link to="/signup" style={{ textDecoration: "none", color: "inherit" }}>
          <FaSearch color="#000" />
        </Link>
      </InputGroup.Text>
    </InputGroup>
  );
}
