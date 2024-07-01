import React, { useState } from "react";
import Card from "./Cards";
import search_icon from "./assets/search.png";
import '../components/styles/BookSearch.css'

const BookSearch = () => {
  var data;
  let arr = {};
  let [itemData,setItemData] = useState([]);


  let api_key = "AIzaSyBpw4t8ypGd_JC7OCWoMQRVJ885lfLXszc";

  const searchAPI = async () => {

    const book = document.getElementsByClassName("bookinput");
    if (book[0].value === "") {
      return 0;
    }
    let url = `https://www.googleapis.com/books/v1/volumes?q=${book[0].value}&intitle:${book[0].value}&key=${api_key}`;

    let response = await fetch(url);
    data = await response.json();
    setItemData(data.items);
    console.log(data)
  };
  arr = itemData.splice(0,4);
  return (
    <div className="main">
      <div className="top-bar">
        <input type="text" className="bookinput" placeholder="search" 
        onKeyDown={(e)=>{
          if(e.key==="Enter")
            searchAPI();
        }}
        ></input>
        <div className="src-icon">
          <img
            className="inputsearch"
            src={search_icon}
            alt="alt"
            onClick={() => {
              searchAPI();
            }}
          ></img>
        </div>
      </div>
      <div className="outer-container">
        {arr.map((item)=>{
          return(
            <div>
            <Card 
            title={item.volumeInfo.title}
            author={item.volumeInfo.authors}
            image={item.volumeInfo.imageLinks} 
            ></Card>
            </div>
          )
        })}
      </div>
    </div>
  );
};
export default BookSearch;
