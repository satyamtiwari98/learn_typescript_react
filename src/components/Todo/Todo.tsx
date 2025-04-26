import { useEffect, useState } from "react";
import "./Todo.css";
import { TODO_URL } from "../../utils/Constant";
import ApiCall from "../../utils/ApiCall";

interface TodoItem {
  id: number;
  title: string;
  completed?: boolean;
}

const ITEMS_PER_PAGE = 10;

const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputTodo, setInputTodo] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res: TodoItem[] = await ApiCall(TODO_URL);
        setTodos(res);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const handleInputTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTodo(event.target.value);
  };

  const handleTodo = () => {
    if (inputTodo.trim().length === 0) return;

    const generateUniqueId = (): number => {
      const existingIds = todos.map((todo) => todo.id);
      let newId = Date.now();
      while (existingIds.includes(newId)) {
        newId += 1;
      }
      return newId;
    };

    const newTodo: TodoItem = {
      id: generateUniqueId(),
      title: inputTodo,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setInputTodo("");
  };

  const handleChecked = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const totalPages = Math.ceil(todos.length / ITEMS_PER_PAGE);
  const paginatedTodos = todos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="todo-container">
      <div>
        <h2>Todos</h2>
      </div>
      <div className="todo-input-container">
        <input
          className="todo-input"
          type="text"
          placeholder="Enter todos"
          onChange={handleInputTodo}
          value={inputTodo}
        />
        <button className="todo-add-btn" type="button" onClick={handleTodo}>
          Add
        </button>
      </div>
      {loading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          <div>
            <ul className="todo-ul">
              {paginatedTodos.map((todo) => (
                <li key={todo.id}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleChecked(todo.id)}
                  />
                  <label className={todo.completed ? "todo-check" : "todo-txt"}>
                    {todo.title}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="pagination">
            <button
              onClick={prevPage}
              className="todo-pagination-btn"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              className="todo-pagination-btn"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Todo;
