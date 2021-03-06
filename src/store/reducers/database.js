import ACTION from '../actionTypes';
import STATUS from '../../definitions/statuses';

//----------------------------------------------------------------------------------------------------
// reducer
//----------------------------------------------------------------------------------------------------
const INIT_STATE = {
  todos: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTION._ADD: return addTodo(state, action);
    case ACTION._UPDATE: return updateTodos(state, action);
    case ACTION._DELETE: return deleteTodos(state, action);
    default: return state;
  }
};

export default reducer;
//----------------------------------------------------------------------------------------------------
// addTodo
//----------------------------------------------------------------------------------------------------
const addTodo = (state, action) => {
  const todo = {
    id: new Date().getTime() + state.todos.length,
    status: STATUS._ON_GOING,
    ...action.content,
  };

  return {
    ...state,
    todos: state.todos.concat(todo),
  };
};
//----------------------------------------------------------------------------------------------------
// updateTodos
//----------------------------------------------------------------------------------------------------
const updateTodos = (state, action) => {
  const newTodos = action.todos.slice();
  const todos = state.todos.slice();
  let todo;

  while ((todo = newTodos.pop())) {
    todos.splice(todos.indexOf(todo), 1, {
      ...todo,
      ...action.content,
    });
  }

  return {
    ...state,
    todos,
  };
};
//----------------------------------------------------------------------------------------------------
// deleteTodos
//----------------------------------------------------------------------------------------------------
const deleteTodos = (state, action) => {
  return {
    ...state,
    todos: state.todos.filter(todo => action.todos.includes(todo) === false),
  };
};
