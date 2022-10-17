import { useState } from "react";

function Accordion({ children, name }) {
  const [show, setShow] = useState(false);

  return (
    <>
      {show && children}
      <span className={name} onClick={() => setShow(!show)}>
        <p className={show ? "cross" : "x"}>+</p>
      </span>
    </>
  );
}

export default Accordion;
