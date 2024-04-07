'use client';
import Dash from './components/Dash';
import Card from './components/Card';
import './globals.css';


const Home = () => {

  return (
    <>
      <section className='theme'>
        <div className='title'>
          <h1>H?NGM?N</h1>
          <Dash />
        </div>

        <div className='theme-container'>
          <h2>Choose your theme</h2>
         <Card />
        </div>
      </section>
    </>
  );
};

export default Home;