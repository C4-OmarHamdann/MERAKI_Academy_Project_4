import React from "react";
import axios from "axios";
import { useState } from "react";

const Search = ({ setPost, allPost }) => {
  const [search, setSearch] = useState("");
  const [cheack, setCheack] = useState("");

  return (
    <div className="search-field">
      <input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyPress={(event) => {
          if (event.key == "Enter") {
            if (!search) {
              setCheack("");
              allPost();
            } else {
              axios
                //send data from body object
                .get(`http://localhost:5000/postes/search_1?userName=${search}`)
                .then((result) => {
                  setPost(result.data.postes);
                  setCheack("done");
                })
                .catch((err) => {
                  //if error
                  setCheack("error");
                  setPost("");
                  console.log(err);
                });
            }
          }
        }}
        type="search"
        placeholder="userName..."
      />
      {
        //if error or undfinde
        cheack == "error" ? (
          <div className="error">no such user!!</div>
        ) : (
          //if undfinde => no change
          <div />
        )
      }
    </div>
  );
};

export default Search;
