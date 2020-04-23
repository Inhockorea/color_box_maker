import React, { useState } from "react";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";
import uuid from "uuid/v4";

function BoxList() {
  const [boxes, setBoxes] = useState([]);

  const renderedBox = () => {
    return (
      <div>
        {boxes.map(box => (
          <Box
            key={box.id}
            id={box.id}
            width={box.width}
            height={box.height}
            remove={remove}
            backgroundColor={box.backgroundColor}
          />
        ))}
      </div>
    )
  }

  /** Add a new box. */

  const addBox = box => {
    let newBox = { ...box, id: uuid() };
    setBoxes(boxes => [...boxes, newBox]);
  };

  /** Remove a box. */

  const remove = id => {
    setBoxes(boxes => boxes.filter(box => box.id !== id));
  };

  return (
    <div className="BoxList">
      <h1>Create your Box!</h1>
      <NewBoxForm addBox={addBox} />
      {renderedBox()}
    </div>
  );
};

export default BoxList


