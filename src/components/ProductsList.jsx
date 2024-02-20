/* eslint-disable react/prop-types */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const retriveProduct = async ({ queryKey }) => {
    const response = await axios.get(`http://localhost:3000/products?_page=${queryKey[1].page}&_per_page=5`);
    return response.data;
}

export default function ProductsList({ onProductClick }) {
    const [page, setPage] = useState(1);
    const { data: products, error, isLoading } = useQuery({
        queryKey: ["products", { page }],
        queryFn: retriveProduct,
        // retry:false,
        // staleTime:5000,
        // refetchInterval:1000,
    })

    if (isLoading) return <div>Fetching products...</div>
    if (error) return <div>An error accured:{error.message}</div>

    function handleProductClick(productId) {
        onProductClick(productId);
    }


    return (
        <div className='flex flex-col justify-center items-center w-3/5'>
            <h2 className='text-3xl my-2'>Products List</h2>
            <ul className='flex flex-wrap justify-center items-center'>
                {
                    products.data && products.data.map(product => (
                        <>
                            <li
                                key={product.id}
                                className='flex flex-col items-center m-2 border rounded-sm'
                            >
                                <img
                                    src={product.thumbnail} alt=""
                                    className='object-cover h-64 w-96 rounded'
                                />
                                <p className='text-xl my-3'>{product.title}</p>
                                <button
                                    onClick={() => handleProductClick(product.id)}
                                >Show Details</button>
                            </li>

                        </>
                    ))
                }
            </ul>
            <div className='flex'>
                {
                    products.prev && (
                        <button
                            className='p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm'
                            onClick={() => setPage(products.prev)}
                        >prev</button>
                    )
                }
                {
                    products.next && (
                        <button
                            className='p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm'
                            onClick={() => setPage(products.next)}
                        >Next</button>
                    )
                }
            </div>
        </div>
    );
}