import React, { useState } from "react";
import { useHistory } from "react-router";
import moment from "moment";
import Error from "./Error";

const CreateExcersise = ({ setIsModalOpen }) => {
  const history = useHistory();
  const [name, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [a, setA] = useState("");
  const [fitnessGoals, setFitnessGoals] = useState("");

  const [startDate, setStartDate] = useState("");
  const validateDateEntry = (entry) => {
    console.log(typeof entry); // returns boolean value of entry

    // let date = new Date((entry)).toISOString();
    // console.log(date);

    const con = moment(entry);
    var isCurrentDate = con.isSame(new Date(), "day");
    console.log(isCurrentDate);
    const dow = con.day();
    if (dow == 1) {
      return dow;
    }
    if (isCurrentDate) {
      return dow;
    } else {
      if (con.isBefore()) {
        try {
        } catch (e) {
          throw "please enter a current date";
        } finally {
          setA("please enter a current date");
        }
      }
      return dow;
    }
  };
  const createExcersise = async (e) => {
    try {
      e.preventDefault();

      try {
        if (validateDateEntry(startDate) !== 1) {
          throw "please enter only mondays ";
        }
      } catch (e) {
        throw "please enter a valid date";
      } finally {
        setA("please enter a week start such as a monday");
      }

      const response = await fetch(
        "http://localhost:5000/exercises/create",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name,
            description,
            startDate,

            fitnessGoals,
          }),
        }
      );

      const data = await response.json();
      setIsModalOpen(false);

      history.push("/Dashboard");
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="row">
      <div className="col-sm-12">
        <h3> Create A new Goal plan </h3>
        <form onSubmit={createExcersise}>
          <div class="mb-3">
            {duration}
            {}
            <label for="exampleInputEmail1" class="form-label">
              Training Goals
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              value={name}
              required="true"
              onChange={(e) => setUserName(e.target.value)}
            />
            <div id="emailHelp" class="form-text">
              set a name for your weekly scchdele
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Description
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              value={description}
              required="true"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="">
              Fitness Goals
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              value={fitnessGoals}
              required="true"
              onChange={(e) => setFitnessGoals(e.target.value)}
            />
          </div>
          <div class="date">
            <label for="exampleInputPassword1" class="form-label">
              StartDate
            </label>
            <input
              type="date"
              class="form-control"
              id="exampleInputPassword1"
              required="true"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <button type="submit" class="btn btn-primary m-3">
            Save
          </button>
          {a}
        </form>
      </div>
    </div>
  );
};

export default CreateExcersise;
