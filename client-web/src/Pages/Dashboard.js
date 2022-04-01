import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ExcersieList from "../components/ExcersieList";
const Dashboard = () => {
  const history = useHistory();
  // async function updateQuote(event) {
  //   event.preventDefault();

  //   const req = await fetch("http://localhost:5000/api/activity", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-access-token": localStorage.getItem("token"),
  //     },
  //     body: JSON.stringify({
  //       quote: tempQuote,
  //     }),
  //   });

  //   const data = await req.json();
  //   if (data.status === "ok") {
  //     setQuote(tempQuote);
  //     setTempQuote("");
  //   } else {
  //     alert(data.error);
  //   }
  // }

  return (
    <div>
      <ExcersieList />
    </div>
  );
};

export default Dashboard;
