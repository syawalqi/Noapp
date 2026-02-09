import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';

export const useTodos = (categoryId = null) => {
  const todos = useLiveQuery(
    async () => {
      let query;
      if (categoryId) {
        query = db.todos.where('categoryId').equals(categoryId);
      } else {
        query = db.todos;
      }

      const results = await query.toArray();
      
      // Sort: Uncompleted first, then by DueDate (ascending, nulls last), then by CreatedAt (descending)
      return results.sort((a, b) => {
        if (a.isCompleted !== b.isCompleted) {
          return a.isCompleted ? 1 : -1;
        }
        
        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (a.dueDate) return -1;
        if (b.dueDate) return 1;

        return b.createdAt - a.createdAt;
      });
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
