import React, {useEffect, useState} from 'react';

function Window(props) {

  return (
    <div className="main-window" id={props.id}>
      <div className="window-title-bar">
        <p>{props.title}</p>
        <p className="close" onClick={props.closeFunction}>X</p>
      </div>
      <div className="inner-window">
        <div className="window-nav-bar">
          <ul>
            {props.options.map((op, i) => <li key={i}>{op}</li>)}
          </ul>
        </div>
        {props.addressBar ?
          <div className="address-bar">
            <p>Address:</p>
            <div className="url">https://genre-analyzer.herokuapp.com/</div>
            <p>Links</p>
          </div>
          :
          <></>
        }
        <div className="content-window">
          {props.children}
        </div>
        {props.bottomBar ? 
          <div className="bottom-bar">
            <p id={props.bottomBarId} onClick={props.bottomBarClick}>{props.bottomBarContent}</p>
          </div>
          :
          <></>
        }
      </div>
    </div>
  );
}

export default Window;