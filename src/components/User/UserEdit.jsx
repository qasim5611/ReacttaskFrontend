import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useMediaQuery } from "@mui/material";
// import Investtab from "./Investtab";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

import "./style.css";
import "./create.css";
// import SunEditor from "suneditor-react";
// import "suneditor/dist/css/suneditor.min.css";

import { Row, Col } from "reactstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { updateUser } from "../../redux/slices/globalSlice";

import API from "./../../redux/url";
import axios from "axios";

const UserEdit = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [record, setrecord] = useState(false);
  const [idtoUpdate, setidtoUpdate] = useState(false);

  console.log("myid");
  console.log(params.id);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    axios
      .get(API + "/getUserByid", { params, signal })
      .then((res) => {
        console.log("getBlogByid.data", res.data);
        console.log(res.data.user[0]);

        setrecord(res.data.user);
        setidtoUpdate(res.data.user[0]._id);
        // setEditRecordBefore(res.data.user[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => controller.abort();
  }, [params]);

  console.log("record");
  console.log(idtoUpdate);

  console.log("idtoUpdate");
  console.log(idtoUpdate);

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
  const [authererr, setauthererr] = useState("");
  const [descerr, setdescerr] = useState("");
  const [dateerr, setdateerr] = useState("");

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    dob: "",
    cnic: "",
    hobby: "",
    profession: "",
    image: null,
  });

  const [description, setDescription] = useState(null);

  const onChangeHandler = (e) => {
    if (e.target.name == "image") {
      let val = e.target.files[0];
      setState({ ...state, [e.target.name]: val });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  };

  const handleChange = (content) => {
    setDescription(content); //Get Content Inside Editor
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let obj = {
      ...state,
      idtoUpdate,
    };

    window.scrollTo(0, 200);

    if (description) obj.description = description;

    // if (validate()) {
    //   console.log(obj);
    //     dispatch(updateBlog(obj));
    // }
    dispatch(updateUser(obj))
      .unwrap()
      .then((result) => {
        console.log("User updated successfully", result);
        toast.success("User updated Successfully", {
          position: "top-right",
          autoClose: 5000,
        });
        navigate("/"); // Navigate to a new route on success
      })
      .catch((error) => {
        console.error("Failed to add user:", error);
        toast.error("Check Your Form Correctly!", {
          position: "top-right",
          autoClose: 5000,
        });
      });
  };

  const validate = () => {
    console.log("validate called");
    let isvalid = true;

    if (
      state.title.length < 5 ||
      state.title.length > 80 ||
      state.title.length == 0
    ) {
      isvalid = false;
      settitleerr("title to be 5 to 80 characters long");
      setauthererr("");
      setdescerr();
      setdateerr();
    } else if (
      state.auther.length < 5 ||
      state.auther.length > 40 ||
      state.auther.length == 0
    ) {
      isvalid = false;
      settitleerr("");
      setauthererr("auther to be 5 to 50 characters long");
      setdescerr("");
      setdateerr("");
    } else if (state.date.length == 0) {
      isvalid = false;
      settitleerr("");
      setauthererr("");
      setdescerr("");
      setdateerr("Date is Required!");
    } else if (description.length == 0) {
      isvalid = false;
      settitleerr("");
      setauthererr("");
      setdescerr("Desc should not empty");
      setdateerr("");
    } else {
      settitleerr("");
      setauthererr("");
      setdescerr("");
      setdateerr("");
    }

    return isvalid;
  };

  return (
    <div class="content-wrapper">
      <div
        id="order_preview"
        class="wow fadeInUp content_box"
        style={{ visibility: "visible", animationName: "fadeInUp" }}
      >
        <Row className="table-header">
          <Col xs="12" md="12">
            <h2 class="section-title">Edit User Detail</h2>
          </Col>
        </Row>

        <div class="row">
          <Row>
            <Col xs="12" md="9">
              {record ? (
                <div>
                  {record.map((item, index) => {
                    return (
                      <form>
                        <div class="form-group">
                          <label for="pwd">First name</label>
                          <input
                            type="text"
                            class="form-control"
                            required
                            name="firstname"
                            onChange={onChangeHandler}
                            defaultValue={item.firstname}
                          />
                          <center>
                            {titleerr ? (
                              <div style={errmsg}>{titleerr}</div>
                            ) : null}
                          </center>
                        </div>

                        <div class="form-group">
                          <label for="pwd"> Last Name </label>
                          <input
                            name="lastname"
                            type="text"
                            class="form-control"
                            required
                            onChange={onChangeHandler}
                            defaultValue={item.lastname}
                          />
                          <center>
                            {authererr ? (
                              <div style={errmsg}>{authererr}</div>
                            ) : null}
                          </center>
                        </div>

                        <div class="form-group">
                          <label for="pwd"> Email </label>
                          <input
                            name="email"
                            type="text"
                            class="form-control"
                            required
                            onChange={onChangeHandler}
                            defaultValue={item.email}
                          />
                          <center>
                            {authererr ? (
                              <div style={errmsg}>{authererr}</div>
                            ) : null}
                          </center>
                        </div>

                        <div class="form-group">
                          <label for="pwd"> Phone Number </label>
                          <input
                            name="phone"
                            type="text"
                            class="form-control"
                            required
                            onChange={onChangeHandler}
                            defaultValue={item.phone}
                          />
                          <center>
                            {authererr ? (
                              <div style={errmsg}>{authererr}</div>
                            ) : null}
                          </center>
                        </div>

                        <div class="form-group">
                          <label for="pwd"> Age</label>
                          <input
                            name="age"
                            type="number"
                            class="form-control"
                            required
                            onChange={onChangeHandler}
                            defaultValue={item.age}
                          />
                          <center>
                            {authererr ? (
                              <div style={errmsg}>{authererr}</div>
                            ) : null}
                          </center>
                        </div>

                        <div class="form-group">
                          <label for="pwd"> Blog Date </label>
                          <input
                            name="dob"
                            type="date"
                            class="form-control"
                            required
                            onChange={onChangeHandler}
                            defaultValue={item.dob}
                          />
                          <center>
                            {dateerr ? (
                              <div style={errmsg}>{dateerr}</div>
                            ) : null}
                          </center>
                        </div>

                        <div class="form-group">
                          <label for="pwd"> cnic</label>
                          <input
                            name="cnic"
                            type="text"
                            class="form-control"
                            required
                            onChange={onChangeHandler}
                            defaultValue={item.cnic}
                          />
                          <center>
                            {authererr ? (
                              <div style={errmsg}>{authererr}</div>
                            ) : null}
                          </center>
                        </div>

                        <div class="form-group">
                          <label for="pwd"> Hobby </label>
                          <input
                            name="hobby"
                            type="text"
                            class="form-control"
                            required
                            onChange={onChangeHandler}
                            defaultValue={item.hobby}
                          />
                          <center>
                            {authererr ? (
                              <div style={errmsg}>{authererr}</div>
                            ) : null}
                          </center>
                        </div>

                        <div class="form-group">
                          <label for="pwd"> Profession </label>
                          <input
                            name="profession"
                            type="text"
                            class="form-control"
                            required
                            onChange={onChangeHandler}
                            defaultValue={item.profession}
                          />
                          <center>
                            {authererr ? (
                              <div style={errmsg}>{authererr}</div>
                            ) : null}
                          </center>
                        </div>

                        <div class="form-group">
                          <label for="pwd">User Image </label>
                          <img
                            src={API + "/uploads/" + item.image}
                            alt={item.image}
                            height="200"
                            width="200"
                          />
                          <input
                            type="file"
                            class="form-control"
                            required
                            name="image"
                            onChange={onChangeHandler}
                          />
                        </div>

                        <button
                          type="submit"
                          class="btn btn-default"
                          onClick={onSubmit}
                          style={{
                            marginTop: 10,
                            float: "right",
                            padding: "8px 16px",
                            fontSize: 16,
                          }}
                        >
                          Update User
                        </button>
                      </form>
                    );
                  })}
                </div>
              ) : (
                <div>Loading...</div>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
