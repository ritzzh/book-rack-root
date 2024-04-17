import React from "react";
import "../components/styles/Cards.css";
const Card = (props) => {
  console.log(props.image.thumbnail);
  return (
    <div >
      <div className="outer-conatiner">
            <div className="card-container">
              <img src={props.image.thumbnail}></img>
              <div className="card-title">
              {props.title}
              </div>
              <div className="card-author">
              {props.author}
              </div>
            </div>
          </div>

    </div>
  );
};

export default Card;
