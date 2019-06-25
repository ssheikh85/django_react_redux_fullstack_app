import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getTodos,
  getSingleTodo,
  getNewTodo,
  removeSingleTodo,
  updateSingleTodo
} from '../store/reducers/reducer';
import CustomModal from './CustomModal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: '',
        description: '',
        completed: false
      }
    };
  }

  componentDidMount() {
    this.props.getAllTodos();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.todos.length !== prevProps.todos.length ||
      this.state.activeItem.title !== prevState.activeItem.title ||
      this.state.activeItem.description !== prevState.activeItem.description ||
      this.state.activeItem.completed !== prevState.activeItem.completed
    ) {
      this.props.getAllTodos();
      this.renderTabList();
    }
  }

  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? 'active' : ''}
        >
          complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? '' : 'active'}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.props.todos.filter(
      item => item.completed === viewCompleted
    );

    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? 'completed-todo' : ''
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            {' '}
            Edit{' '}
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete{' '}
          </button>
        </span>
      </li>
    ));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      this.props.updateTodo(item, item.id);
    } else {
      this.props.addTodo(item);
    }
  };

  handleDelete = item => {
    this.props.deleteTodo(item.id);
  };

  createItem = () => {
    const item = { title: '', description: '', completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">
                  Add task
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <CustomModal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

const mapState = state => {
  return {
    todos: state.allTodos,
    todo: state.singletodo
  };
};

const mapDispatch = dispatch => {
  return {
    getAllTodos: () => dispatch(getTodos()),
    getTodo: id => dispatch(getSingleTodo(id)),
    addTodo: aTodo => dispatch(getNewTodo(aTodo)),
    deleteTodo: id => dispatch(removeSingleTodo(id)),
    updateTodo: (aTodo, id) => dispatch(updateSingleTodo(aTodo, id))
  };
};

export default connect(
  mapState,
  mapDispatch
)(App);
