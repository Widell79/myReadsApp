import React, { createContext, useState, useEffect } from 'react';

import {getBook} from "../utils/api"
import { getData, storeData } from "../utils/api";


export const BookContext = createContext();

const BookContextProvider = (props) => {
  const [books, setBooks] = useState([]);
	const [search, setSearch] = useState([]);

  const handleInitialData = async () => {
				//const booksData = localStorage.getItem('books');
				const booksData =  await getData()
				console.log(booksData);
				return booksData
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

	useEffect(() => {
    storeData(books)
  }, [books]);
  
  return (
    <BookContext.Provider value={{ books, handleInitialData, update_shelf, update_search, search}}>
      {props.children}
    </BookContext.Provider>
  );
	}



 
export default BookContextProvider;