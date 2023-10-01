import React from "react";

export default function PersonForm({
  newName,
  newPhone,
  handleNameChange,
  handlePhoneChange,
  handleSubmit,
}) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
}
