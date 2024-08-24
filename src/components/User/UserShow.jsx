import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useMediaQuery } from "@mui/material";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Row, Col } from "reactstrap";
import "./style.css";
import "./create.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link, NavLink } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { deleteUserByid, getUser } from "./../../redux/slices/globalSlice.js";

import API from "./../../redux/url.js";
import axios from "axios";

import Footer from "./../Footer/index.js";

const UserShow = () => {
  const dispatch = useDispatch();

  const [articleList, setArticleList] = useState([]);
  const [articleList2, setArticleList2] = useState([]);

  const [loading, setLoading] = useState(true);

  const searchTextField = (e) => {
    e.preventDefault();
    let searching = e.target.value.toLowerCase();
    let result = articleList2.filter(
      (item) =>
        item.firstname && item.firstname.toLowerCase().includes(searching)
    );
    setArticleList(result);
  };

  const isUserDeleted = useSelector((state) => state.global.isUserDeleted);

  console.log("isUserDeleted");
  console.log(isUserDeleted);

  useEffect(() => {
    // setLoading(true);
    dispatch(getUser());
  }, [isUserDeleted]);

  const dataArray = useSelector((state) => state.global.data);
  console.log("dataArray", dataArray);

  useEffect(() => {
    if (dataArray) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      setArticleList(dataArray);
      setArticleList2(dataArray);
    }
  }, [dataArray]); // Only run when dataArray changes

  const filesstyle = {
    color: "black",
    border: "1px black solid",
    width: "100%",
    background: "white",
    height: "36px",
    padding: "7px",
    border: "1px solid rgb(190, 194, 199)",
    borderRadius: "7px",
    marginBottom: "20px",
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  };

  const labls = {
    color: "#101924",
    flex: "1",
    marginLeft: "2px",
  };

  const errmsg = {
    color: "red",
    position: "relative",
    top: "-11px",
  };

  const inputstyle = {
    padding: "3px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    border: "1px solid #bec2c7",
    borderRadius: "7px",
    marginBottom: "20px",
  };

  const check = useMediaQuery("(max-Width:900px)");

  const [titleerr, settitleerr] = useState("");

  const submit = (_id) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteBlog(_id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const deleteBlog = (id) => {
    let obj = {
      id: id,
    };
    dispatch(deleteUserByid(obj));
  };

  return (
    <div class="content-wrapper">
      <div
        id="order_preview"
        class="wow fadeInUp content_box"
        style={{ visibility: "visible", animationName: "fadeInUp" }}
      >
        {/* Companies Header and Search Bar Start */}

        <Row className="table-header">
          <Col md="4">
            <h2 class="section-title">All Users</h2>
          </Col>
          <Col md="8">
            <form class="form-inline form-searchbar" action="#">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search By FName.."
                  onChange={searchTextField}
                  style={{ width: "100%" }}
                />
              </div>
              <NavLink to="/userCreate">
                <button
                  type="submit"
                  class="btn btn-default"
                  style={{ padding: "10px" }}
                >
                  Add New User
                </button>
              </NavLink>
            </form>
          </Col>
        </Row>

        <div class="row">
          <div class="col-xs-12 col-md-12">
            <div class="table-responsive">
              {articleList && articleList.length ? (
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <th class="active">S#</th>
                      <th class="active">First Name</th>
                      <th class="active">Last Name</th>
                      <th class="active">Email</th>
                      <th class="active">Phone</th>
                      <th class="active">DOB</th>
                      <th class="active">CNIC</th>
                      <th class="active">Hobby</th>
                      <th class="active">Profession</th>

                      <th class="active">User Image</th>

                      <th class="active" style={{ width: "300px" }}>
                        Action
                      </th>
                    </tr>

                    {articleList.map((item, ind) => {
                      return (
                        <tr>
                          <td>{ind + 1}</td>
                          <td>{item.firstname && item.firstname}</td>
                          <td>{item.lastname && item.lastname}</td>

                          <td>{item.email && item.email}</td>
                          <td>{item.phone && item.phone}</td>
                          <td>{item.dob && item.dob}</td>
                          <td>{item.cnic && item.cnic}</td>
                          <td>{item.hobby && item.hobby}</td>
                          <td>{item.profession && item.profession}</td>

                          <td>
                            <img
                              src={API + "/uploads/" + item.image}
                              alt={item.image}
                              height="50"
                            />
                          </td>

                          <td style={{ textAlign: "center" }}>
                            <Link to={`/userEdit/${item._id}`}>
                              <ModeEditIcon />
                            </Link>

                            <DeleteForeverIcon
                              onClick={() => submit(item._id)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer loading={loading} />
    </div>
  );
};

export default UserShow;
