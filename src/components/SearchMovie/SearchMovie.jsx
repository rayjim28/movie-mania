import React from "react";

export default function SearchMovie(props) {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search Movie"
        value={props.value}
        onChange={(evt) => props.setSearchMovie(evt.target.value)}
      />
      {/* <div className="input-group-append">
        <button className="btn btn-primary" type="button">
          Search
        </button>
      </div> */}
    </div>
  );
}
