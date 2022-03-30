import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div>
      <h1>Bookshelf</h1>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to="/toc">Table of Contents</Link> |{' '}
        <Link to="/glossary">Glossary</Link>
      </nav>
    </div>
  );
};

export default App;
