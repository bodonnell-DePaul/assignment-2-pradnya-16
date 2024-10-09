/*
Name: Pradnya Kadam
Student ID: 2173563
Web Application Assignment 2
*/


import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('TodoList Component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('renders the title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Assignment 2: Pradnya's ToDo List/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders form elements', () => {
    render(<App />);
    const todoInput = screen.getByPlaceholderText(/Add todo item/i);
    const dueDateInput = screen.getByLabelText(/Due Date/i);
    const addButton = screen.getByText(/Add Todo/i);

    expect(todoInput).toBeInTheDocument();
    expect(dueDateInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test('renders todo items', () => {
    render(<App />);
    const todoItems = screen.getAllByRole('tab');
    expect(todoItems.length).toBe(4); // Assuming there are 4 todos in the initial state
  });

  test('renders todo items with correct titles', () => {
    render(<App />);
    const todoTitles = ['Todo 1', 'Todo 2', 'Todo 3', 'Todo 4'];
    todoTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  const getVariant = (dueDate) => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const diffTime = Math.abs(dueDateObj - currentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays > 7) return 'primary';
    if (diffDays <= 7 && diffDays > 4) return 'success';
    if (diffDays <= 4 && diffDays > 2) return 'warning';
    return 'danger';
  };
  
  test('applies correct variant based on due date', () => {
    render(<App />);
    const todoItems = screen.getAllByRole('tabpanel');
    const todoTab = screen.getAllByRole('tablist');
  
    let variants = [];
    todoItems.forEach((item) => {
      const input = item.querySelector('input');
      const dueDate = input.getAttribute('value'); // Assuming due date is stored in a data attribute
      const expectedVariant = getVariant(dueDate);
      variants.push(expectedVariant);
      //expect(item).toHaveClass(`list-group-item-${expectedVariant}`);
    });

    todoTab.forEach((item, index) => {
        const anchor = item.querySelector('a');
        expect(anchor).toHaveClass(`list-group-item-${variants[index]}`);
        
  });


   });

});