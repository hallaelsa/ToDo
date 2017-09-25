
function initState() {
  return {
    todos: [
      { name: "Lære react native", date: "2017-09-27", interval: 6 },
      { name: "lage app", date: "2017-09-11", interval: 5 },
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