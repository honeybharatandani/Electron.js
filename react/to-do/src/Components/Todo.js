import React, { useState } from "react";
import todo from "../images/todo.jpeg";
import "./Todo.css";
const Todo = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (!input) {
    } else {
      setItems([...items, input]);
      setInput("");
    }
  };

  const deleteItem = id => {
    console.log(id);

    const updatedItems = items.filter((element, index) => {
      return index !== id;
    });
    setItems(updatedItems);
  };

  const removeAll = () => {
    setItems([]);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="todo logo" />
            <figcaption>Add Your List</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Items.."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <i
              className="fa fa-plus add-btn"
              title="Add Item"
              onClick={addItem}
            ></i>
          </div>
          <div className="showItems">
            {items.map((element, index) => {
              return (
                <div className="eachItem" key={index}>
                  <h3>{element} </h3>
                  <i
                    className="far fa-trash-alt add-btn"
                    title="Delete Item"
                    onClick={() => deleteItem(index)}
                  ></i>
                </div>
              );
            })}
          </div>
        </div>
        <div className="showItems">
          <button
            className="btn effect04"
            data-sm-link-text="Remove All"
            onClick={removeAll}
          >
            <span>Remove All</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;
