import React from "react";

const AsideLeft = ({ avatarUser, userName }) => {
  return (
    <>
      <div className="asideLeft">
        <div className="asideLeftItems">
          <a className="asideLeftItem" href="/home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="rgba(29, 161, 242, 1)"
              className="bi bi-twitter"
              viewBox="0 0 16 16"
            >
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
            </svg>
          </a>
          <a className="asideLeftItem" href="/home">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              className="StyledIconBase-ea9ulj-0 bWRyML sc-jSgvzq latfBt"
            >
              <path d="m21.743 12.331-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 0 0-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .743-1.669z"></path>
            </svg>
            <p>Home</p>
          </a>
          <a className="asideLeftItem" href="/home">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              className="StyledIconBase-ea9ulj-0 bWRyML sc-gKseQn bxeuMb"
            >
              <path d="M16.018 3.815 15.232 8h-4.966l.716-3.815-1.964-.37L8.232 8H4v2h3.857l-.751 4H3v2h3.731l-.714 3.805 1.965.369L8.766 16h4.966l-.714 3.805 1.965.369.783-4.174H20v-2h-3.859l.751-4H21V8h-3.733l.716-3.815-1.965-.37zM14.106 14H9.141l.751-4h4.966l-.752 4z"></path>
            </svg>
            <p>Explore</p>
          </a>
          <a className="asideLeftItem" href="/home">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              className="StyledIconBase-ea9ulj-0 bWRyML sc-iBPTik ekjHVv"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"></path>
            </svg>
            <p>Notifications</p>
          </a>
          <a className="asideLeftItem" href="/home">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              className="StyledIconBase-ea9ulj-0 bWRyML sc-fubCzh cWgqFW"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"></path>
            </svg>
            <p>Messages</p>
          </a>
          <a className="asideLeftItem" href="/home">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              className="StyledIconBase-ea9ulj-0 bWRyML sc-pGacB klEDOB"
            >
              <path d="M18 2H6c-1.103 0-2 .897-2 2v18l8-4.572L20 22V4c0-1.103-.897-2-2-2zm0 16.553-6-3.428-6 3.428V4h12v14.553z"></path>
            </svg>
            <p>Bookmarks</p>
          </a>
          <a className="asideLeftItem" href="/home">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              className="StyledIconBase-ea9ulj-0 bWRyML sc-jrAFXE bxlbPA"
            >
              <path d="M20 20a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h16zm4-7a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h20zm-2-7a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h18z"></path>
            </svg>
            <p>Lists</p>
          </a>
          <a className="asideLeftItem" href="/home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#fff"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
            <p>Profile</p>
          </a>
          <a
            onClick={() => {
              localStorage.removeItem("userToken");
            }}
            className="asideLeftItem"
            href="/login"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#fff"
              className="bi bi-box-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
              />
              <path
                fillRule="evenodd"
                d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
              />
            </svg>
            <p>Logout</p>
          </a>
          <span className="userImg">
            <div>
              {avatarUser ? (
                <img
                  width={70}
                  height={70}
                  src={`http://localhost:5000/uploads/${avatarUser}`}
                  alt="media"
                />
              ) : (
                <img
                  width={70}
                  height={70}
                  src={`https://ui-avatars.com/api/?name=${userName}`}
                  alt="media"
                />
              )}
            </div>
            <span>
              <h5>@{userName}</h5>
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default AsideLeft;
