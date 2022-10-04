import React, {useEffect} from 'react';
import './App.css';
import TaskList from "./components/TaskList";
import CreateTaskInput from "./components/CreateTaskInput";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
      return (
        <div>
            <Header/>
            <TaskList/>
            <Footer/>
        </div>
      );
}

export default App;
