import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';

export const useTodos = (categoryId = null) => {
  const todos = useLiveQuery(
    async () => {
      if (categoryId) {
        return await db.todos.where('categoryId').equals(categoryId).toArray();
      }
      return await db.todos.toArray();
    },
    [categoryId]
  );

  const categories = useLiveQuery(() => db.todoCategories.toArray(), []);

  const addTodo = async (title, categoryId = null, dueDate = null) => {
    return await db.todos.add({
      title,
      isCompleted: false,
      categoryId,
      dueDate,
      createdAt: new Date(),
    });
  };

  const updateTodo = async (id, changes) => {
    return await db.todos.update(id, changes);
  };

  const deleteTodo = async (id) => {
    return await db.todos.delete(id);
  };

  const addCategory = async (name, color = '#777777') => {
    return await db.todoCategories.add({ name, color });
  };

  const deleteCategory = async (id) => {
    // Note: In a real app, we might want to unset categoryId for todos in this category
    return await db.todoCategories.delete(id);
  };

  return {
    todos,
    categories,
    addTodo,
    updateTodo,
    deleteTodo,
    addCategory,
    deleteCategory,
  };
};
