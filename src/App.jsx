import { useEffect, useState } from "react";
import classes from "./styles.module.css";
import TodoItem from "./components/todo-item";
import TodoDetails from "./components/todo-details";
import { Skeleton } from "@mui/material";

function App() {
  const [todoList, setToDoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [todoDetails, setTodoDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  async function fetchListOfTodos() {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/todos");
      const result = await response.json();

      if (result?.todos && result?.todos?.length > 0) {
        setToDoList(result?.todos);
        setLoading(false);
        setErrorMsg("");
      } else {
        setToDoList([]);
        setLoading(false);
        setErrorMsg("");
      }
    } catch (error) {
      console.log(errorMsg);
      setErrorMsg("Some Error Occured");
    }
  }
  async function fetchDetailsOfCurrentTodo(getCurrentTodoId) {
    try {
      const response = await fetch(
        `https://dummyjson.com/todos/${getCurrentTodoId}`
      );
      const details = await response.json();
      if (details) {
        setTodoDetails(details);
        setOpenDialog(true);
      } else {
        setTodoDetails(null);
        setOpenDialog(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchListOfTodos();
  }, []);

  if (loading) {
    return <Skeleton variant="rectangular" width={650} height={650} />;
  }

  return (
    <div className={classes.mainWrapper}>
      <h1 className={classes.headerTitle}>Todo App using Material UI</h1>
      <div className={classes.todoListWrapper}>
        {todoList && todoList.length > 0
          ? todoList.map((todoItem) => (
              <TodoItem
                todo={todoItem}
                fetchDetailsOfCurrentTodo={fetchDetailsOfCurrentTodo}
              />
            ))
          : null}
      </div>
      <TodoDetails
        openDialog={openDialog}
        todoDetails={todoDetails}
        setOpenDialog={setOpenDialog}
        setTodoDetails={setTodoDetails}
      />
    </div>
  );
}

export default App;
