/*
Name: Pradnya Kadam
Student ID: 2173563
Web Application Assignment 2
*/

import React from 'react';
import { ListGroup, Tab, Row, Col, Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import todoItems from './todoItems';

// Color coding function
function getVariant(dueDate) {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));  

  if (diffDays > 7) return 'primary';  //  
  if (diffDays <= 7 && diffDays > 4) return 'success';  // 
  if (diffDays <= 4 && diffDays > 2) return 'warning';  // 
  if (diffDays <= 2) return 'danger';  // Red
}

function App() {
  return (
    <Container>
      <h1 className="app-header">Assignment 2: Pradnya's ToDo List</h1>

      <Row>
        {/* Entering to-do item */}
        <Col sm={4}>
          <div className="todo-form">
            <h4>ToDo Item</h4>
            <Form>
              <Form.Group controlId="formTitle">
                <Form.Control type="text" placeholder="Add todo item" />
              </Form.Group>
              <Form.Group controlId="formDueDate">
                <Form.Label>Due Date</Form.Label>  
                <Form.Control type="date" />
              </Form.Group>
              <Button variant="primary" type="submit" className="add-todo-btn">
                Add ToDo
              </Button>
            </Form>
          </div>
        </Col>

        {/* List of all the to-do items */}
        <Col sm={8}>
          <Tab.Container id="list-group-tabs" defaultActiveKey="#todo0">
            <Row>
              {/* Titles */}
              <Col sm={4}>
                <ListGroup>
                  {todoItems.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      action
                      href={`#todo${index}`}
                      className="todo-item"
                      variant={getVariant(item.dueDate)}  
                    >
                      {item.title}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>

              {/* To-do description */}
              <Col sm={8}>
                <Tab.Content>
                  {todoItems.map((item, index) => (
                    <Tab.Pane key={index} eventKey={`#todo${index}`} className="todo-description">
                      <p contentEditable="true">{item.description}</p>
                      <input type="date" defaultValue={item.dueDate} />
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
