import React, { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router";
import { useHistory } from "react-router";

const EditExcersise = ({
  setIsModalOpen,
  id,
  names,
  descriptions,
  startDates,
  endDates,
  fitnessGoales,
}) => {
  const history = useHistory();
  const [name, setUserName] = useState(names);
  const [description, setDescription] = useState(descriptions);
  const [duration, setDuration] = useState("");

  const [fitnessGoals, setFitnessGoals] = useState(fitnessGoales);
  const [completed, setCompleted] = useState(false);
  const [startDate, setStartDate] = useState(startDates);
  const [endDate, setEndDate] = useState(endDates);

  const editItem = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(
        `http://localhost:5000/exercises/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name,
            description,
            completed,
            fitnessGoals,
          }),
        }
      );
      const data = await response.json();
      setIsModalOpen(false);

      history.push("/Dashboard");
      window.location.reload();
    } catch (e) {
      console.log("error has occure");
    }
  };

  return (
    <div className="row">
      <div className="col-sm-12">
        <form onSubmit={editItem}>
          <h3>edit the values</h3>
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
          <div>
            <label for="exampleInputPassword1" class="form-label">
              Achiement:have you completed this goal
            </label>
            <input
              type="checkbox"
              id="exampleInputPassword1"
              checked={completed}
              required="true"
              onChange={(e) => setCompleted(e.target.checked)}
            />
          </div>

          <button type="submit" class="btn btn-primary m-3">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditExcersise;
