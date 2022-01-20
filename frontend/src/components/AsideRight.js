import React from "react";
import Search from "./Search";

import { useState } from "react";

const AsideRight = ({ setPostes, allPosts, news }) => {
  const [limit, setLimit] = useState(6);

  const newsMap = news.slice(0, limit).map((el, i) => {
    return (
      <div key={i} className="aside-right-item">
        <p>Cricket . LIVE</p>
        <h4>{el.title}</h4>
        <p>
          Trending with <span>#{el.author}</span>
        </p>
        <hr />
      </div>
    );
  });
  return (
    <>
      <div className="aside-right-items">
        <Search setPost={setPostes} allPost={allPosts} />
        <h2>What's happening ?</h2>
        {newsMap}
        <a className="showMore" onClick={() => setLimit(limit + 4)}>
          Show more
        </a>
      </div>
    </>
  );
};

export default AsideRight;
