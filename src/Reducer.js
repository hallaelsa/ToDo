import moment from 'moment';

function initState() {
  return {
    todos: [
      { name: "vaske klær", date: moment().format("YYYY-MM-DD"), interval: 6 },
      { name: "pusse sølvtøy", date: moment().format("YYYY-MM-DD"), interval: 100 },
      { name: "trene", date: moment().format("YYYY-MM-DD"), interval: 3 },
      { name: "vaske badet", date: moment().format("YYYY-MM-DD"), interval: 12 },
      { name: "skifte sengetøy", date: moment("2017-10-07").format("YYYY-MM-DD"), interval: 16 },
      { name: "skifte håndklær", date: moment().format("YYYY-MM-DD"), interval: 12 },
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