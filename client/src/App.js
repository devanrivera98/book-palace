// import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';


function App() {
  // const [serverData, setServerData] = useState("");

  // useEffect(() => {
  //   async function getServerData() {
  //     const resp = await fetch('/api/hello');
  //     const data = await resp.json();

  //     console.log('Data from server:', data);

  //     // setServerData(data.message);
  //   }

  //   getServerData();
  // }, []);

  return (
    <>
      <Header></Header>
    </>
  );
}

export default App;

// return (
//   <div className="App">
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <h1>{serverData}</h1>
//     </header>
//   </div>
// );
// }
