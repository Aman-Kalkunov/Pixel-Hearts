import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

let Header = () => {
  const history = useHistory();
  const location = useLocation();

  const isCardPage = location.pathname.includes("/card");
  const isAuthPage = location.pathname.includes("/oauth");

  //по клику очищаем LocalStorage и направляем на главную страницу 
  const buttonLogOutClick = () => {
    localStorage.removeItem("token");
    history.push("/");
  }

const buttonToAuthPageClick = () => {
  isCardPage && history.push("/oauth");
}

  const buttonBackClick = () => {
    history.goBack();
  }

  return (
    <header className="header">
      <div className="container">
        <button className="button header__button" onClick={buttonToAuthPageClick}>
          <h1 className="header__title">Base of Likes</h1>
        </button>
        {isCardPage && <button onClick={buttonBackClick} className="button">Go Back</button>}
        {isAuthPage && <button onClick={buttonLogOutClick} className="button">Log Out</button>}
      </div>
    </header>
  )
}

export default Header;