import React, { useState } from "react";

/** Form for creating a new box to add to a list of boxes.
 *
 * Has state for the width/height/backgroundColor of the item; on submission,
 * sends {width, height, background} to fn rec'd from parent.
 *
 */

const NewListBoxForm = ({ addBox }) => {
  const INITIAL_STATE = { width: 0, height: 0, backgroundColor: "" };
  const [formData, setFormData] = useState({...INITIAL_STATE});
  
  //** example ) formData.width = 17; would lead to mutating useState{INITIAL_STATE} in line 12.

  //TIPS from JOEL useState(INITIAL_STATE) might lead to a mistake where someone mutates an object that is declared const
  // {...INITIAL_STATE} protective coding -> later on thinking about redux and making sure that we are not mutating thing that we arent supposed to
  // PURE function: does not rely on any variable that is not defined outside && does not mutate anything  (stronger than idempotent)

  /** Send {width, height, backgroundColor} to parent
   *    & clear form. */

  const handleSubmit = evt => {
    evt.preventDefault();
    addBox(formData);
    setFormData(INITIAL_STATE);
  };

  /** Update local state w/curr state of input elem */

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  };

  /** render form */

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="width">Width:</label>
        <input
          id="width"
          type="number"
          name="width"
          value={formData.width}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="height">Height:</label>
        <input
          id="height"
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="backgroundColor">Background Color:</label>
        <input
          id="backgroundColor"
          name="backgroundColor"
          value={formData.backgroundColor}
          onChange={handleChange}
        />
      </div>
      <br></br>
      <button>Add a new box!</button>
    </form>
  );
};
//TIPS FROM JOEL: copy and paste to make sure you are following the consistency, the pattern adn the order
//TYPE is talking about the INPUT TYPE SILLY!
export default NewListBoxForm;
