import axios from 'axios';

const initialState = {
  allTodos: [],
  singleTodo: {}
};

//action creators
const SET_TODOS = 'SET_TODOS';
const ADD_NEW_TODO = 'ADD_NEW_TODO';
const DELETE_TODO = 'DELETE_TODO';
const UPDATE_TODO = 'UPDATE_TODO';

export const setTodos = todos => ({ type: SET_TODOS, todos });
export const setNewTodo = newTodo => ({ type: ADD_NEW_TODO, newTodo });
export const deleteTodo = id => ({ type: DELETE_TODO, id });
export const updateTodo = (todoToUpdate, id) => ({
  type: UPDATE_TODO,
  todoToUpdate,
  id
});

//thunks
export const getTodos = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('api/todos/');
      dispatch(setTodos(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const getNewTodo = newTodo => {
  return async dispatch => {
    try {
      const { data } = await axios.post('api/todos/', newTodo);
      console.log(data);
      dispatch(setNewTodo(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const removeSingleTodo = id => {
  return async dispatch => {
    try {
      const { data } = await axios.delete(`/api/todos/${id}/`);
      dispatch(deleteTodo(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateSingleTodo = (todoToUpdate, id) => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`/api/todos/${id}/`, todoToUpdate);
      dispatch(updateTodo(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TODOS:
      return { ...state, allTodos: action.todos };
    case ADD_NEW_TODO:
      return { ...state, allTodos: [...state.allTodos, action.todo] };
    case DELETE_TODO:
      const removedTodosArr = state.allTodos.filter(todoToRemove => {
        return todoToRemove.id === action.id;
      });
      return { ...state, allTodos: removedTodosArr };
    case UPDATE_TODO:
      let newSingleTodo;
      if (state.singleTodo.id === action.id) {
        newSingleTodo = action.todoToUpdate;
      }
      return { ...state, singleTodo: newSingleTodo };
    default:
      return state;
  }
}
