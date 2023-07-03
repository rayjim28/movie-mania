import React from "react";

export default function MovieHeading(props) {
  return (
    <div className="text-left">
      <h1>{props.heading}</h1>
    </div>
  );
}
