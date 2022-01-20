import React from "react";
import axios from "axios";
import { useState } from "react";

const Sort = ({ postes, setPostes }) => {
  return (
    <div className="blue form">
      <button
        onClick={() => {
          postes.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
          console.log(postes);
          setPostes(postes);
        }}
      >
        sort
      </button>
    </div>
  );
};

export default Sort;
