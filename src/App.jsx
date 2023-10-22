
import './App.css';


import EmailList from './components/EmailList'; 
import EmailDetails from './components/EmailDetails'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Email Client App</h1>
      </header>
      <main>
        <div className="email-app">
          <div className="email-list-container">
           
            <EmailList />
          </div>
          <div className="email-details-container">
            {/* Render the EmailDetails component */}
            <EmailDetails />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
