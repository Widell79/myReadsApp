import React, {useContext} from "react";

import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  FlatList,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
} from "react-native";



import * as BooksAPI from "../utils/api";
import { BookContext } from '../contexts/BookContext';




const Search = ({ route, navigation }) => {
  const { currentBooks } = route.params;
  const { search, update_search } = useContext(BookContext);


  

  const searchBook = (query) => {
    BooksAPI.search(query).then((book) => {
      if (query.length !== 0) {
        update_search(book)
      }
    });
  };

  const updateSearch = (e) => {
    const value = e.nativeEvent.text;

    searchBook(value);
  };

  const searchedBooks = search;

  function mapBooksToList(books) {
    return {
      values: Object.values(books),
    };
  }

  const bookList = mapBooksToList(searchedBooks);
  const bookListInfo = bookList.values.map((data) => {
    return data;
  });

  const renderBooks = ({ item }) => {
    const bookOnShelf = currentBooks.find(({ id }) => id === item.id);
    const shelf = bookOnShelf ? bookOnShelf.shelf : "none";
    const background = `${
      item.volumeInfo.imageLinks
        ? item.volumeInfo.imageLinks.thumbnail
        : "./bg.png"
    }`;

    return (
      <View style={styles.searchBooksResults}>
        <View style={styles.booksGrid}>
          <View style={styles.book}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Book", {
                    bookTitle: item.volumeInfo.title,
                    bookAuthor: item.volumeInfo.authors,
                    image: background,
                    shelf: shelf,
                    language: item.volumeInfo.language,
                    pages: item.volumeInfo.pageCount,
                    publishedDate: item.volumeInfo.publishedDate,
                    id: item.id,
                  });
                }}
              >
                <Image
                  source={{ uri: background }}
                  style={{
                    width: 128,
                    height: 188,
                    backgroundColor: "#eee",
                    marginTop: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.bookTitle}>{item.volumeInfo.title}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.bookshelfBooks}>
        <View>
          <View style={styles.searchBooksBar}>
            <View>
              <TextInput
                style={styles.searchInput}
                onChange={updateSearch}
                placeholder="Search by title"
              />
            </View>
          </View>

          <FlatList
            data={bookListInfo}
            numColumns={2}
            renderItem={({ item }) => renderBooks({ item })}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#faf3e0",
    flex: 1,
  },
  bookshelfBooks: {
    alignItems: "center",
  },
  book: {
    width: 140,
  },
  searchBooksBar: {
    position: "relative",
    marginTop: 20,
    zIndex: 5,
  },
  searchBooksInputWrapper: {
    flex: 1,
  },
  searchInput: {
    height: 60,
    width: 250,
    margin: 12,
    paddingLeft: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#eabf9f",
  },
  searchBooksResults: {
    padding: 25,
  },
  booksGrid: {
    padding: 0,
    margin: 0,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  bookTitle: {
    fontSize: 16,
    marginTop: 10,
  },
});
