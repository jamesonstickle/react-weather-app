import React from "react";
const Conditions = (props) => {
  return (
    <div>
      {props.error && <small id="cityErrMsg">Please enter a valid city.</small>}
      {props.loading && <div>Loading...</div>}
      {props.responseObj.cod === 200 ? (
        <div>
          <p id="cityNameResult">
            <strong>{props.responseObj.name}</strong>
          </p>
          <p id="weatherResult" className="pb-4">
            It is currently {Math.round(props.responseObj.main.temp)}&deg; out
            with {props.responseObj.weather[0].description}.
          </p>
        </div>
      ) : null}
    </div>
  );
};
export default Conditions;
