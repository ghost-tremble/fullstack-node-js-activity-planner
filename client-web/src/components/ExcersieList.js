import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";
import Appbar from "./Appbar";
import Modal from "./Modal";
import EditExcercise from "./EditExcercise";
import moment from "moment";
import { FiArrowRight } from "react-icons/fi";
import { FiDelete } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import Loader from "./Loader";
const ExcersieList = ({ description, setErr }) => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [week, setWeek] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");
  const [currentWeek, setCurrentWeek] = useState("");
  const [finalWeek, setFinal] = useState("");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("Your weekly activity plans");
  let weekDays;
  const getCurrentWeek = () => {
    var currentDate = moment();
    var weekStart = currentDate.clone().startOf("week");
    var weekEnd = currentDate.clone().endOf("week");

    var days = [];

    for (var i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, "days").format("MMMM Do,dddd"));
    }

    return days;
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/exercises/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (data.status == "ok") {
        const fetchData = async () => {
          const response = await fetch(
            "http://localhost:5000/exercises",

            {
              headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token"),
              },
            }
          );

          const excercise = await response.json();
          setData([excercise]);
          return excercise;
        };
        fetchData();
      } else if (data.error) {
        console.log(data.error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async () => {
    const response = await fetch(
      "http://localhost:5000/exercises",

      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );

    const excercise = await response.json();

    setData([excercise]);
    return excercise;
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        history.replace("/login");
      } else {
        try {
          fetchData();
        } catch (e) {
          console.log(e);
        }
      }
    }
  }, []);

  const getIncompleteGoals = (bol) => {
    if (data.length >= 1) {
      let a = data[0].filter((one) => one.completed == bol);

      setData([a]);
    }
  };
  const getGoalsForTheWeek = (date) => {
    if (data.length >= 1) {
      let a = data[0].filter((one) => {
        const startDate = moment(one.startDate, "x").format("MMMM Do[,]dddd");
        setWeek(startDate);

        console.log(startDate);
        return startDate == date;
      });
      console.log(a);
      setData([a]);
    }
  };
  useEffect(() => {
    getCurrentWeek();
    weekDays = getCurrentWeek();
    setFinal(weekDays[6]);
    setCurrentWeek(weekDays[1]);
    console.log(weekDays[1]);
  }, []);
  useEffect(() => {
    getIncompleteGoals(false);
  }, []);
  useEffect(() => {
    const c = setInterval(() => {
      setLoading();
    }, 3000);
    return () => {
      clearInterval(c);
    };
  }, []);

  return (
    <div>
      <div>
        <Appbar setIsModalOpen={setIsModalOpen} setModalData={setModalData} />

        <h3 className="text-center"> {text}</h3>
      </div>
      <div className="">
        {data.map((single, index) => {
          if (single) {
            return (
              <div className="goals-container" key={single._id}>
                {single.length < 1 ? (
                  <h3>{loading ? <Loader /> : "no Activities"} </h3>
                ) : (
                  single.map((one, index) => {
                    const {
                      _id,
                      email,
                      description,
                      name,
                      startDate,
                      endDate,
                      fitnessGoals,
                      completed,
                    } = one;

                    // let date = new Date(Number(startDate)).toISOString();
                    // const con = moment(date); // Thursday Feb 2015
                    // const dow = con.day();
                    // console.log(dow);

                    return (
                      <div className="custom-card  " key={index}>
                        <div key={index}>
                          <p>
                            Starting Date <FiArrowRight />{" "}
                            {moment(startDate, "x").format(
                              "MMMM Do [,] dddd  "
                            )}{" "}
                            {}{" "}
                          </p>
                          <p>
                            Goal <FiArrowRight /> {name}
                          </p>
                          <p>
                            Description <FiArrowRight /> {description}
                          </p>
                          <p>
                            Fitness <FiArrowRight /> {fitnessGoals}
                          </p>
                          <p>
                            <AiOutlineStar /> Achievement <FiArrowRight />{" "}
                            {completed
                              ? "completed Achievement"
                              : "Achievement not reached"}
                          </p>
                        </div>

                        <button
                          className="btn custom"
                          onClick={() => {
                            deleteItem(one._id);
                          }}>
                          <FiDelete />
                        </button>

                        <button
                          className="btn custom"
                          onClick={() => {
                            setModalData(
                              <EditExcercise
                                setIsModalOpen={setIsModalOpen}
                                id={_id}
                                names={name}
                                descriptions={description}
                                startTimes={startDate}
                                endTimes={endDate}
                                fitnessGoales={fitnessGoals}
                              />
                            );
                            setIsModalOpen(true);
                          }}>
                          <BiEdit />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            );
          }
        })}
      </div>
      <div className="group-btn">
        <button
          className="btn custom"
          onClick={() => {
            setText("showing  incomplete goals");
            setLoading(true);
            getIncompleteGoals(false);
          }}>
          Show incomplete Goals
        </button>
        <button
          className="btn custom"
          onClick={() => {
            setLoading(true);
            setText("showing all Training Goals");
            fetchData();
          }}>
          show All training goals
        </button>
        <button
          className="btn custom"
          onClick={() => {
            setLoading(true);
            setText(
              `  showing Excercise Activity for the week ${week[1]} to ${finalWeek}`
            );
            getGoalsForTheWeek(currentWeek);
          }}>
          show goals for this week
        </button>
        <button
          className="btn custom"
          onClick={() => {
            setErr("link copied");
            navigator.clipboard.writeText(
              "http:localhost:5000/dashboard/share"
            );
            getIncompleteGoals(false);
          }}>
          Share link
        </button>
      </div>

      {isModalOpen ? (
        <Modal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          modalData={modalData}
          setModalData={setIsModalOpen}
          setErr={setErr}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ExcersieList;
