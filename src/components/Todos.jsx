import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { useUI } from '../context/UIContext';
import { 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Plus, 
  Timer, 
  Calendar,
  Tag
} from 'lucide-react';

const Todos = () => {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodos();
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    await addTodo(newTodoTitle);
    setNewTodoTitle('');
  };

  const toggleTodo = async (todo) => {
    await updateTodo(todo.id, { isCompleted: !todo.isCompleted });
  };

  return (
    <div className="flex-1 bg-paper-50 p-8 md:p-16 overflow-y-auto paper-grain h-screen">
      <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-4xl font-serif font-bold text-paper-900 mb-8">Todos</h1>

        {/* New Todo Input */}
        <form onSubmit={handleAddTodo} className="mb-12">
          <div className="relative group">
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full bg-paper-100 border-b-2 border-paper-200 focus:border-paper-700 outline-none p-4 text-xl transition-all font-serif placeholder-paper-300 pr-12"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-paper-400 hover:text-paper-800 transition-colors"
            >
              <Plus size={24} />
            </button>
          </div>
        </form>

        {/* Todo List */}
        <div className="space-y-3">
          {todos?.length === 0 ? (
            <div className="text-center py-12 text-paper-300 italic font-serif">
              No tasks yet. Enjoy your clear schedule!
            </div>
          ) : (
            todos?.sort((a, b) => a.isCompleted - b.isCompleted || b.createdAt - a.createdAt).map((todo) => (
              <div 
                key={todo.id}
                className="papery-card-interactive group flex items-center p-4"
              >
                <button
                  onClick={() => toggleTodo(todo)}
                  className={`mr-4 transition-colors ${
                    todo.isCompleted ? 'text-green-600' : 'text-paper-300 hover:text-paper-600'
                  }`}
                >
                  {todo.isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>
                
                <div className="flex-1 min-w-0">
                  <span className={`text-lg transition-all ${
                    todo.isCompleted ? 'text-paper-300 line-through' : 'text-paper-800'
                  }`}>
                    {todo.title}
                  </span>
                </div>

                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-2 text-paper-300 hover:text-red-600 transition-colors"
                    title="Delete Task"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Todos;
