import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
function App() {
  const [count, setCount] = useState(0)
  const [products,setProducts] = useState([])
  const [categoryName,setCategoryName] = useState("")
  const [top,setTop] = useState(100)
  const [page,setPage] = useState(1)
  return (
    <>
      <form action="" className='bg-gray-100 border-4 mb-10 border-gray-200 flex flex-col gap-5 w-96 p-5' onSubmit={function(e){
        e.preventDefault()
      }}>
        <input className='p-3 rounded-xl shadow-lg' type="text" placeholder='categoryName' value={categoryName} onChange={(e) => {
          setCategoryName(e.target.value)
        }} />
        <input className='p-3 rounded-xl shadow-lg' type="number" placeholder='top' value={top} onChange={(e) => setTop(e.target.value)}/>
        <input className='p-3 rounded-xl shadow-lg' type="number" placeholder='page' value={page} onChange={(e) => setPage(e.target.value)}/>
        <button className='bg-red-100 rounded-full' onClick={async () => {
          const url = `http://localhost:3000/categories/${categoryName}/products?top=${top}&page=${page}`;
          console.log(url)
        const data =  await axios.get(url)
        setProducts(data.data.data)
        console.log(data.data.data)
      }}>Get products</button>
      </form>
      <div className='flex gap-8 flex-wrap'>
      {
        products.map(product => (
          <>
            <div className='border-4 border-black p-4'>
            <h1>Name : {product.productName}</h1>
            <h1>Company : {product.companyName}</h1>
            <h1>Price : {product.price}</h1>
            <h1>Rating : {product.rating}</h1>
            <h1>Discount : {product.discount}</h1>
            <h1>Availability : {product.availability}</h1>
            </div>
          </>
        ))
      }
      </div>
      {
        
      }
    </>
  )
}

export default App
