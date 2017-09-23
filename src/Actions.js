export const addTodo = (todo) => {
    return {
      type: 'ADD_TODO',
      todo
    }
}

export const deleteTodo = (index) => {
  return {
    type: 'DELETE_TODO',
    index
  }
}