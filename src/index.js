import React from "react";
import ReactDOM from "react-dom";

function App() {
  return (
    <div className='frame'>
      <section className='top-layer'>
        <div className='container'>
          <h1 className='heading'>
            Weather App
            <img className='image' src='./brisun.png' />
          </h1>
          <form>
            <input type='text' placeholder='Search...' autoFocus={true} />
            <button type='submit'>Search Location</button>
            <br />
            <span className='message'></span>
          </form>
        </div>
      </section>
      <section className='card'>
        <div className='container'>
          <ul className='cities'></ul>
        </div>
      </section>
      <footer className='footer-div'>
        <div className='container'>
          <small>
            By <span>&#9829;</span> Ashtral Lorien Goveas <span>&#9829;</span>
          </small>
        </div>
      </footer>
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
export default App;
