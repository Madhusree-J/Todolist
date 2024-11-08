import { useState, useCallback, useMemo } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

 
  const remainingTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  
  const addTodo = useCallback(() => {
    if (newTodo.trim() !== '') {
      setTodos(prevTodos => [
        ...prevTodos,
        { id: Date.now(), text: newTodo, completed: false }
      ]);
      setNewTodo('');
    }
  }, [newTodo]);

  
  const toggleTodo = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

 
  const deleteTodo = useCallback((id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  return (
    
    <div className='text-center bg-teal-700 min-h-screen'>
      <h1 className='text-black font-bold text-6xl m-10 p-10 font-serif'>TODO LIST</h1>
      <div >
        <input
        className='w-2/4 h-12 rounded-lg text-center text-black font-serif text-2xl font-semibold'
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTodo} className='border border-black m-3 p-3 w-1/8 rounded-full bg-white text-2xl font-semibold font-serif'>ADD</button>
      </div>
      <h3 className='font-semibold font-serif text-4xl'>{remainingTodos} Tasks Remaining</h3>
      <ol className='text-4xl font-serif bg-white  text-center'>
        {todos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <span onClick={() => toggleTodo(todo.id)} style={{ cursor: 'pointer' }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)} className='bg-red-500 rounded-full p-2 m-2 text-2xl '>
              Delete
            </button>
          </li>
        ))}
      </ol>
      </div>
    
  );
}

export default App;