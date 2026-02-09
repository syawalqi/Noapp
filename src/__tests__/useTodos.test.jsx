import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import React from 'react';
import 'fake-indexeddb/auto';
import { useTodos } from '../hooks/useTodos';
import { db } from '../db';
import { UIProvider } from '../context/UIContext';

describe('useTodos Hook', () => {
  const wrapper = ({ children }) => <UIProvider>{children}</UIProvider>;

  beforeEach(async () => {
    await db.todos.clear();
    await db.todoCategories.clear();
  });

  it('should add a todo', async () => {
    const { result } = renderHook(() => useTodos(), { wrapper });
    
    let id;
    await act(async () => {
      id = await result.current.addTodo('Test Todo');
    });

    const todo = await db.todos.get(id);
    expect(todo.title).toBe('Test Todo');
    expect(todo.isCompleted).toBe(false);
  });

  it('should add a category', async () => {
    const { result } = renderHook(() => useTodos(), { wrapper });
    
    let id;
    await act(async () => {
      id = await result.current.addCategory('Work', '#0000ff');
    });

    const category = await db.todoCategories.get(id);
    expect(category.name).toBe('Work');
  });
});
