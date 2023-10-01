import React from "react";

export default function Total({ parts }) {
  const getTotalExercises = () =>
    parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <b>Total of {getTotalExercises()} exercises</b>
    </p>
  );
}
