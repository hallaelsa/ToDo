import moment from 'moment';

function initState() {
  return {
    todos: [
      { name: "item 1", date: moment().format("YYYY-MM-DD"), interval: 6 },
      { name: "item 2", date: moment("2017-10-30").format("YYYY-MM-DD"), interval: 5 },
      { name: "item 3", date: moment().format("YYYY-MM-DD"), interval: 10 },
      { name: "item 4", date: moment("2017-12-30").format("YYYY-MM-DD"), interval: 12 },
      { name: "item 5", date: moment("2017-10-07").format("YYYY-MM-DD"), interval: 60 },
      { name: "item 6", date: moment("2017-12-31").format("YYYY-MM-DD"), interval: 20 },
      { name: "item 7", date: moment("2017-11-09").format("YYYY-MM-DD"), interval: 30 },
      { name: "item 8", date: moment("2017-09-30").format("YYYY-MM-DD"), interval: 1 },
      { name: "item 9", date: moment().format("YYYY-MM-DD"), interval: 6 },
      { name: "item 10", date: moment("2017-09-30").format("YYYY-MM-DD"), interval: 5 },
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
      let nextState = Object.assign({}, state);
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