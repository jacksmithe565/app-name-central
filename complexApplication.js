// Filename: complexApplication.js

/*
 * This code represents a complex web application that allows users to manage their tasks and projects.
 * It includes features like authentication, task creation, task assignment, project management, and more.
 * The code is designed to be modular, scalable, and well-organized.
 * Note: This is a simplified version of a real-world application, some functionalities may be omitted.
 */

// Import necessary modules and dependencies

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Component: App

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      tasks: [],
      projects: [],
    };
  }

  componentDidMount() {
    this.fetchUserData();
    this.fetchTasks();
    this.fetchProjects();
  }

  fetchUserData() {
    // Fetch user data from API and update state
    axios.get('/api/user')
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(error => {
        console.error('Failed to fetch user data:', error);
      });
  }

  fetchTasks() {
    // Fetch tasks from API and update state
    axios.get('/api/tasks')
      .then(response => {
        this.setState({ tasks: response.data });
      })
      .catch(error => {
        console.error('Failed to fetch tasks:', error);
      });
  }

  fetchProjects() {
    // Fetch projects from API and update state
    axios.get('/api/projects')
      .then(response => {
        this.setState({ projects: response.data });
      })
      .catch(error => {
        console.error('Failed to fetch projects:', error);
      });
  }

  render() {
    const { user, tasks, projects } = this.state;

    return (
      <Router>
        <div>
          <Header user={user} />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/tasks" component={() => <Tasks tasks={tasks} />} />
            <Route path="/projects" component={() => <Projects projects={projects} />} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

// Component: Header

const Header = ({ user }) => {
  return (
    <header>
      <h1>Task Manager</h1>
      {user && <h3>Welcome, {user.name}!</h3>}
    </header>
  );
};

// Component: Dashboard

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to the task manager. Here, you can manage your tasks and projects.</p>
    </div>
  );
};

// Component: Tasks

const Tasks = ({ tasks }) => {
  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

// Component: Projects

const Projects = ({ projects }) => {
  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map(project => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
};

// Component: NotFound

const NotFound = () => {
  return (
    <div>
      <h2>404 Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

// Render the app

ReactDOM.render(<App />, document.getElementById('root'));