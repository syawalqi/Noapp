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
  Tag,
  Hash,
  X
} from 'lucide-react';

const Todos = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const { 
    todos, 
    categories, 
    addTodo, 
    updateTodo, 
    deleteTodo, 
    addCategory, 
    deleteCategory 
  } = useTodos(activeCategoryId);
  
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    await addTodo(newTodoTitle, activeCategoryId);
    setNewTodoTitle('');
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    await addCategory(newCategoryName, randomColor);
    setNewCategoryName('');
    setIsAddingCategory(false);
  };

  const toggleTodo = async (todo) => {
    await updateTodo(todo.id, { isCompleted: !todo.isCompleted });
  };

  return (
    <div className="flex-1 flex bg-paper-100 overflow-hidden h-screen">
      {/* Category Sidebar */}
      <div className="w-64 border-r border-paper-200 bg-paper-50/50 flex flex-col p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-paper-400">Categories</h2>
          <button 
            onClick={() => setIsAddingCategory(true)}
            className="p-1 hover:bg-paper-200 rounded-full transition-colors text-paper-600"
          >
            <Plus size={16} />
          </button>
        </div>

        <nav className="space-y-1 mb-8">
          <button
            onClick={() => setActiveCategoryId(null)}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-sm transition-colors ${
              activeCategoryId === null 
                ? 'bg-paper-200 text-paper-900 shadow-sm' 
                : 'text-paper-600 hover:bg-paper-100 hover:text-paper-900'
            }`}
          >
            <Hash className="mr-3 h-4 w-4" />
            All Tasks
          </button>
          
          {categories?.map((cat) => (
            <div key={cat.id} className="group flex items-center">
              <button
                onClick={() => setActiveCategoryId(cat.id)}
                className={`flex-1 flex items-center px-3 py-2 text-sm font-medium rounded-sm transition-colors ${
                  activeCategoryId === cat.id
                    ? 'bg-paper-200 text-paper-900 shadow-sm'
                    : 'text-paper-600 hover:bg-paper-100 hover:text-paper-900'
                }`}
              >
                <div 
                  className="w-2 h-2 rounded-full mr-4" 
                  style={{ backgroundColor: cat.color }} 
                />
                <span className="truncate">{cat.name}</span>
              </button>
              <button 
                onClick={() => deleteCategory(cat.id)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-600 transition-all ml-1"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </nav>

        {isAddingCategory && (
          <form onSubmit={handleAddCategory} className="animate-in fade-in slide-in-from-top-2 duration-300">
            <input
              autoFocus
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category name..."
              className="w-full bg-paper-100 border-b border-paper-300 focus:border-paper-700 outline-none p-2 text-sm font-serif mb-2"
              onBlur={() => !newCategoryName && setIsAddingCategory(false)}
            />
          </form>
        )}
      </div>

      {/* Main Todo List */}
      <div className="flex-1 bg-paper-50 p-8 md:p-16 overflow-y-auto paper-grain">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-paper-900 mb-8">
            {activeCategoryId ? categories?.find(c => c.id === activeCategoryId)?.name : 'Todos'}
          </h1>

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

          <div className="space-y-3">
            {todos?.length === 0 ? (
              <div className="text-center py-12 text-paper-300 italic font-serif animate-in fade-in duration-500">
                No tasks here. You're all caught up!
              </div>
            ) : (
              todos?.sort((a, b) => a.isCompleted - b.isCompleted || b.createdAt - a.createdAt).map((todo) => {
                const category = categories?.find(c => c.id === todo.categoryId);
                return (
                  <div 
                    key={todo.id}
                    className="papery-card-interactive group flex items-center p-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
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
                      <div className="flex items-center space-x-2">
                        <span className={`text-lg transition-all truncate ${
                          todo.isCompleted ? 'text-paper-300 line-through' : 'text-paper-800'
                        }`}>
                          {todo.title}
                        </span>
                        {category && !activeCategoryId && (
                          <span 
                            className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-sm opacity-60"
                            style={{ backgroundColor: category.color + '20', color: category.color }}
                          >
                            {category.name}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="p-2 text-paper-300 hover:text-red-600 transition-colors"
                        title="Delete Task"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todos;