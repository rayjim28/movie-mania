import React from "react";

export default function SearchMovie(props) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search Movie"
        value={props.value}
        onChange={(evt) => props.setSearchMovie(evt.target.value)}
      ></input>
    </div>
  );
}
