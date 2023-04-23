import Header from './Header';
import Homepage from './Homepage';
import ResultsPage from './ResultsPage';
import MoreInfoPage from './MoreInfoPage';
import './App.css';
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<Homepage />}/>
          <Route path='results' element={<ResultsPage/>}/>
          <Route path='info' element={<MoreInfoPage/>}/>
        </Route>
      </Routes>
    </div>
  )
};

export default App;
