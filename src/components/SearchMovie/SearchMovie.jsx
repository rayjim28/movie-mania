import React from "react";

export default function SearchMovie(props) {
  return (
    <div className="input-group mb-3">
      {/* Input field for searching movies */}
      <input
        type="text"
        className="form-control"
        placeholder="Search Movie"
        value={props.value}
        onChange={(evt) => props.setSearchMovie(evt.target.value)}
      />
      {/* Search button (commented out for now) */}
      {/* <div className="input-group-append">
        <button className="btn btn-primary" type="button">
          Search
        </button>
      </div> */}
    </div>
  );
}
