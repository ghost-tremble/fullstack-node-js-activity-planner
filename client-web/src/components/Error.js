import React from "react";

const Error = ({ err }) => {
  return <div>{err && <div className="alert alert-danger">{err}</div>}</div>;
};

export default Error;
