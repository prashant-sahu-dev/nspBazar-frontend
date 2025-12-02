import { useSelector } from 'react-redux';
import Categories from '../components/Categories';
import Hero from '../components/Hero/Hero' ;
import MarketPlace from '../components/MarketPlace/MarketPlace' ;

const Home = ()=> {
  
  const token = localStorage.getItem("token") ;
        

 let products = useSelector(store => store.items) ;

    return <>
    <main>
        <Hero></Hero>
        <MarketPlace></MarketPlace>
        {products.length === 0 && <h2 className="no-items">No Products available</h2>}
      </main>
      </>

}

export default Home ;