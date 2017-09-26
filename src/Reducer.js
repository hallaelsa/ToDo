import moment from 'moment';

function initState() {
  return {
    todos: [
      { name: "Lære react native", date: moment().format("YYYY-MM-DD"), interval: 6 },
      { name: "lage app", date: moment("2017-09-30").format("YYYY-MM-DD"), interval: 5 },
      { name: "Lære react native", date: moment().format("YYYY-MM-DD"), interval: 6 },
      { name: "lage app", date: moment("2017-09-30").format("YYYY-MM-DD"), interval: 5 },
      { name: "Lære react native", date: moment().format("YYYY-MM-DD"), interval: 6 },
      { name: "lage app", date: moment("2017-09-30").format("YYYY-MM-DD"), interval: 5 },
      { name: "Lære react native", date: moment().format("YYYY-MM-DD"), interval: 6 },
      { name: "lage app", date: moment("2017-09-30").format("YYYY-MM-DD"), interval: 5 },
      { name: "Lære react native", date: moment().format("YYYY-MM-DD"), interval: 6 },
      { name: "lage app", date: moment("2017-09-30").format("YYYY-MM-DD"), interval: 5 },
    ]
  };
}

function reducer(state = initState(), action) {
  switch (action.type) {
    case "ADD_TODO": {
      let nextState = Object.assign({}, state)
      nextState.todos.push(action.todo);
      return nextState;
    }
    case "UPDATE_TODO": {
      let nextState = Object.assign({}, state)
      nextState.todos[action.index] = action.todo;
      return nextState;
    }
    case "DELETE_TODO": {
      let nextState = Object.assign({}, state)
      nextState.todos.splice(action.index, 1);
      return nextState;
    }
    default:
      return state;
  }
}

export default reducer;