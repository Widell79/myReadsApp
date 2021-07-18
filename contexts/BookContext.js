import React, { createContext, useState } from 'react';
import { LogBox } from 'react-native';
import {getBook} from "../utils/api"
import { getInitial } from "../utils/api";


export const BookContext = createContext();

const BookContextProvider = (props) => {
  const [books, setBooks] = useState([]);

  const handleInitialData = async () => {
    
      try {
        const booksData = await getInitial().then((book) => {
            setBooks([...books, {...book, shelf: "currentlyReading"}]);
            //setBooks(book)
        });
  
        if (booksData === null) return;
      } catch (e) {
        console.error("Failed to load books!");
      }
    
  };

  console.log(books);
  
  return (
    <BookContext.Provider value={{ books, handleInitialData}}>
      {props.children}
    </BookContext.Provider>
  );
}



 
export default BookContextProvider;