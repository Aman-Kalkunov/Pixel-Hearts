import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

let Header = () => {
  const history = useHistory();
  const location = useLocation();

  const isHomePage = location.pathname === "/"
  const isAuthPage = location.pathname.includes("/oauth");
  const isCardPage = location.pathname.includes("/card");

  //по клику очищаем LocalStorage и направляем на главную страницу 
  const buttonLogOutClick = () => {
    localStorage.removeItem("token");
    history.push("/");
  }

const buttonToAuthPageClick = () => {
  if (isCardPage) {
    history.push("/oauth");
  };
}

  const buttonBackClick = () => {
    history.goBack();
  }

  return (
    <header className="header">
      <div className="container">
        <button className="button header__button" onClick={buttonToAuthPageClick}>
          <h1 className="header__title">Pixel Hearts</h1>
        </button>
        {isHomePage && <h2 className="header__title">Welcome to our application!</h2>}
        {isCardPage && <button onClick={buttonBackClick} className="button">Go Back</button>}
        {isAuthPage && <button onClick={buttonLogOutClick} className="button">Log Out</button>}
      </div>
    </header>
  )
}

export default Header;