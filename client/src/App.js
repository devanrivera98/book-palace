import Header from './Header';
import Homepage from './Homepage';
import './App.css';
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<Homepage />}/>
        </Route>
      </Routes>
    </div>
  )
};

export default App;
