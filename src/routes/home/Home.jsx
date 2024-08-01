import React from 'react'
import Nav from '../../components/nav/Nav'
import CardDesign from '../../components/card/CardDesign'


const Home = () => {
  return (
    <div className='body w-screen h-screen' >
      <Nav />
      <div className="container">
        <h1 className='text-4xl p-3'>Most Popular products</h1>
        <CardDesign style={{margin: "0 auto"}} />
      </div>
    </div>
  )
}

export default Home