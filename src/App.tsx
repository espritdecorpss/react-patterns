import React from 'react';
import Expandable from "./components/Expandable";
import './App.styles.css';

const CompoundComponent = () => {
    return (
        <Expandable>
            <Expandable.Header>React Hooks</Expandable.Header>
            <Expandable.Icon />
            <Expandable.Body>Hooks are awesome</Expandable.Body>
        </Expandable>
    );
}

function App () {
    return (
        <div className="App">
            <CompoundComponent/>
        </div>
    );
}

export default App;
