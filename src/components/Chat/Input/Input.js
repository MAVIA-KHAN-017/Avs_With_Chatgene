import React from "react";
import "./Input.css"
import { useState, useEffect } from "react";

function Input({text}) {
  const [initials, setInitials] = useState("U");
  return (
    <div className="container-input">
      <span>{initials}</span> 
      <p className="letter-transform">
        {text}
      </p>
    </div>
  );
}

export default Input;
