import React, { createContext, useState } from 'react';

import {getBook} from "../utils/api"
import { getInitial } from "../utils/api";


export const BookContext = createContext();

const BookContextProvider = (props) => {
  const [books, setBooks] = useState([]);
	const [search, setSearch] = useState([]);

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

  const update_shelf = async (id, shelf) => {
    try {
        await getBook(id).then((book) => {
					
					const updatedBook = {...book, shelf}
					const newState = {
						...books,
						[id]: {
							...updatedBook
						}
					}
					console.log(newState);
					setBooks(newState)

        });
      } catch (err) {
        console.warn("Error in update_shelf: ", err);
        alert("There was an error updating the shelf. Please try again.");
      }
    };

	
  

  const update_search = (query) => {
		setSearch(query)
	}
  
  return (
    <BookContext.Provider value={{ books, handleInitialData, update_shelf, update_search, search}}>
      {props.children}
    </BookContext.Provider>
  );
	}



 
export default BookContextProvider;