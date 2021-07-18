export const bookReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_SEARCH':
        return [...state, {
        
          }
        ]
      case 'REMOVE_BOOK':
        return state.filter(book => book.id !== action.id);
      default:
        return state;
    }
  } 