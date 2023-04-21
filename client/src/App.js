import Header from './Header';
// import Homepage from './Homepage';
import ResultsPage from './ResultsPage';
import './App.css';
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<ResultsPage />}/>
        </Route>
      </Routes>
    </div>
  )
};

export default App;
