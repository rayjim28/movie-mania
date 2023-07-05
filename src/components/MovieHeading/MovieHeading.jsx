import React from "react";

export default function MovieHeading(props) {
  // The MovieHeading component takes in props as its argument.
  return (
    <div className="text-left">
      <h1>{props.heading}</h1>
    </div>
  );
}
