import React, { useState } from "react";
import { connect } from "react-redux";
import "./Users.css";
import { Modal, Button, Card } from "react-bootstrap";
import CalendarData from "./CalendarData";

function Users(props) {
  //DECLARING ALL STATES VALUES USING REACTHOOKS
  const [values, setValues] = useState({
    status: false,
    user: {},
    logs: "",
    calendar: false,
    events: []
  });

  //INITIALIZING ALL STATE VALUES
  const handleUser = user => {
    setValues({ status: true, user: user, logs: user.activity_periods });
  };

  //INITIALIZING VALUES OF EVENTS
  const handleCalendar = () => {
    const events = values.logs.map(log => {
      return {
        start: new Date(log.start_time.slice(0, 10)),
        end: new Date(log.end_time.slice(0, 10)),
        title: `${log.start_time.slice(11)}-${log.end_time.slice(11)}`
      };
    });
    setValues({ calendar: true, events, status: false });
  };

  return (
    <div>
      <div className="Home">Home</div>
      {values.calendar && (
        //CALANDER COMPONENT
        <Modal
          className="modal-dialog modal-lg mdl"
          show={values.calendar}
          onHide={() => setValues({ calendar: false })}
          animation={true}
          centered
          size="lg">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <CalendarData events={values.events} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setValues({ calendar: false })}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* LISTING USERS  */}
      {props.users.map(user => {
        return (
          <div key={user.id} align="center">
            <br />
            <Card className="Card " onClick={() => handleUser(user)} body>
              <h3>User Name: &ensp;{user.real_name}</h3>
            </Card>
            <br />
          </div>
        );
      })}

      {/* USER DETAILS IN VIEW */}
      {values.status && (
        <Modal
          show={values.status}
          onHide={() => setValues({ status: false })}
          animation={true}
          centered
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header className="header" closeButton>
            <b>User Name - </b>
            &ensp;{values.user.real_name}
          </Modal.Header>

          <Modal.Body className="body">
            <h5>Location - {values.user.tz} </h5>

            <br />
            <span>
              <h4>Activity Periods </h4>
            </span>
            <br />
            {values.logs &&
              values.logs.map((log, i) => (

                <li key={i}>
                  <span>
                    <b>{log.start_time.slice(0, 10)}</b>
                  </span>
                  <br />
                  <>
                    &ensp;&ensp;{log.start_time.slice(11)} -{" "}
                    {log.end_time.slice(11)}
                  </>
                </li>

              ))}
          </Modal.Body>
          <Modal.Footer className="header">
            <Button className="button" onClick={() => setValues({ status: false })}>Close</Button>

            {/* CALLING  CALADER EVENT*/}
            <Button className="button" onClick={handleCalendar}>View In Calendar</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

//ACCESSING THE STATE FROM THE STORE
const mapStateToProps = state => {
  return {
    users: state.users
  };
};
export default connect(mapStateToProps)(Users);
