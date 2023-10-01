import React from "react";

export default function Content({ course }) {
  return (
    <>
      <main>
        {course.parts.map((item) => (
          <p key={item.id}>
            {item.name} {item.exercises}
          </p>
        ))}
      </main>
    </>
  );
}
