import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { useUI } from '../context/UIContext';
import PomodoroTimer from './PomodoroTimer';
import { 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Plus, 
  Timer, 
  Calendar,
  Hash,
  X,
  Brain,
  Minimize2
} from 'lucide-react';

const Todos = () => {
  const { 
    activeModule, 
    isFocusMode, 
    setIsFocusMode, 
    focusTodoId, 
    setFocusTodoId 
  } = useUI();
  
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [showTimer, setShowTimer] = useState(false);
  
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
  const [newTodoDate, setNewTodoDate] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const focusedTodo = todos?.find(t => t.id === focusTodoId);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    await addTodo(newTodoTitle, activeCategoryId, newTodoDate ? new Date(newTodoDate) : null);
    setNewTodoTitle('');
    setNewTodoDate('');
  };

  const toggleTodo = async (todo) => {
    await updateTodo(todo.id, { isCompleted: !todo.isCompleted });
  };

  const handleEnterFocus = (todoId) => {
    setFocusTodoId(todoId);
    setIsFocusMode(true);
  };

  const handleExitFocus = () => {
    setFocusTodoId(null);
    setIsFocusMode(false);
  };

  const getDueDateBadge = (date) => {
    if (!date) return null;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    const diffTime = d - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { label: 'Overdue', color: 'text-red-600 bg-red-50' };
    if (diffDays === 0) return { label: 'Today', color: 'text-amber-600 bg-amber-50' };
    if (diffDays === 1) return { label: 'Tomorrow', color: 'text-paper-600 bg-paper-100' };
    return { label: d.toLocaleDateString(), color: 'text-paper-400 bg-paper-100' };
  };

  // --- Focus View ---
  if (isFocusMode && focusedTodo) {
    return (
      <div className="flex-1 bg-paper-100 flex flex-col items-center justify-center p-8 paper-grain animate-in fade-in duration-1000">
        <button 
          onClick={handleExitFocus}
          className="absolute top-8 right-8 p-3 hover:bg-paper-200 rounded-full transition-all text-paper-400 hover:text-paper-800"
          title="Exit Focus Mode"
        >
          <Minimize2 size={24} />
        </button>

        <div className="max-w-md w-full space-y-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-paper-200 p-4 rounded-full animate-pulse">
                <Brain className="h-8 w-8 text-paper-800" />
              </div>
            </div>
            <h2 className="text-3xl font-serif font-bold text-paper-900 tracking-tight leading-tight">
              {focusedTodo.title}
            </h2>
            <p className="text-paper-400 text-xs uppercase font-bold tracking-widest">Deep Work Session</p>
          </div>

          <PomodoroTimer />
          
          <div className="flex justify-center">
            <button
              onClick={() => toggleTodo(focusedTodo)}
              className={`flex items-center px-6 py-3 rounded-sm border transition-all text-sm font-bold uppercase tracking-wider ${
                focusedTodo.isCompleted 
                  ? 'bg-green-50 border-green-200 text-green-700' 
                  : 'bg-paper-50 border-paper-200 text-paper-700 hover:border-paper-400'
              }`}
            >
              {focusedTodo.isCompleted ? <CheckCircle2 size={18} className="mr-3" /> : <Circle size={18} className="mr-3" />}
              {focusedTodo.isCompleted ? 'Task Completed' : 'Mark as Done'}
            </button>
          </div>
        </div>
      </div>
    );
  }

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

        <hr className="my-6 border-paper-200" />

        <button
          onClick={() => setShowTimer(!showTimer)}
          className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-sm transition-colors ${
            showTimer 
              ? 'bg-paper-800 text-paper-50 shadow-md' 
              : 'text-paper-600 hover:bg-paper-100'
          }`}
        >
          <Timer className="mr-3 h-4 w-4" />
          General Timer
        </button>
      </div>

      {/* Main Todo List */}
      <div className="flex-1 bg-paper-50 p-8 md:p-16 overflow-y-auto paper-grain h-screen flex flex-col items-center">
        <div className="max-w-2xl w-full">
          {showTimer ? (
            <div className="animate-in fade-in zoom-in duration-500 py-12">
              <PomodoroTimer />
            </div>
          ) : (
            <>
              <h1 className="text-4xl font-serif font-bold text-paper-900 mb-8">
                {activeCategoryId ? categories?.find(c => c.id === activeCategoryId)?.name : 'Todos'}
              </h1>

              <form onSubmit={handleAddTodo} className="mb-12 space-y-4">
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
                <div className="flex items-center space-x-4 animate-in fade-in duration-700">
                  <div className="flex items-center bg-paper-100 rounded-sm px-3 py-1.5 border border-paper-200">
                    <Calendar size={14} className="text-paper-400 mr-2" />
                    <input 
                      type="date"
                      value={newTodoDate}
                      onChange={(e) => setNewTodoDate(e.target.value)}
                      className="bg-transparent text-xs font-bold uppercase tracking-wider text-paper-600 outline-none cursor-pointer"
                    />
                  </div>
                </div>
              </form>

              <div className="space-y-3">
                {todos?.length === 0 ? (
                  <div className="text-center py-12 text-paper-300 italic font-serif animate-in fade-in duration-500">
                    No tasks here. You're all caught up!
                  </div>
                ) : (
                  todos?.map((todo) => {
                    const category = categories?.find(c => c.id === todo.categoryId);
                    const badge = getDueDateBadge(todo.dueDate);
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
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                            <span className={`text-lg transition-all truncate ${
                              todo.isCompleted ? 'text-paper-300 line-through' : 'text-paper-800'
                            }`}>
                              {todo.title}
                            </span>
                            <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                              {category && !activeCategoryId && (
                                <span 
                                  className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-sm opacity-60"
                                  style={{ backgroundColor: category.color + '20', color: category.color }}
                                >
                                  {category.name}
                                </span>
                              )}
                              {badge && !todo.isCompleted && (
                                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-sm ${badge.color}`}>
                                  {badge.label}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                          <button
                            onClick={() => handleEnterFocus(todo.id)}
                            className="p-2 text-paper-300 hover:text-paper-800 transition-colors"
                            title="Focus on this task"
                          >
                            <Brain size={18} />
                          </button>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todos;
