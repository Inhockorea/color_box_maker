import React from "react";

const deleteLabel = "X"

function Box({ id, width, height, backgroundColor, remove }) {
  const boxStyle = {
    width: `${width}cm`,
    height: `${height}cm`,
    backgroundColor
  };

  return (
    <div>
      <div id={id} data-testid={backgroundColor} style={boxStyle}></div>
      <button data-testid={`${backgroundColor}removeBtn`} onClick={evt => remove(id)}>{deleteLabel}</button>
    </div>
  );
}

export default Box
export { deleteLabel }


/**TIPS FROM JOEL 
 * line 13, onClick instead of () put in evt ; we could know instantly that it is supposed to be an 
 * event handler, even if you dont use the event!
*/
