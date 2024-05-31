import React, { useEffect, useState } from 'react'
import axios from "axios";
import Navbarr from './Navbar';
import Spinner from './Spinner';
import Card from './Card';
import { url } from '../default';


export default function HomePage() {
    // const [cart, setCart] = useCart();

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    //get products
    const getAllProducts = async () => {
        
        try {
            setLoading(true);
            const { data } = await axios.get(`${url}api/v1/product/get`);
            setProducts(data?.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    useEffect(() => {
        getAllProducts()
    }, []);

  

  return (
    <div>
          <Navbarr />
              <h2 className="text-center">All Products</h2>
           {/* <pre>{JSON.stringify(products, null, 4)}</pre>  */}

        {loading?<Spinner />:
              <div className="d-flex flex-wrap justify-content-center">

                  {products?.map((item) => (
                    <Card key={item._id} item={item} />
                  ))}
              </div>
        }
              
          
    </div>
  )
}
