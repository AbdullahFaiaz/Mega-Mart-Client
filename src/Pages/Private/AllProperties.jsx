// import { useQuery } from "@tanstack/react-query"
import { Link, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxiosPublic from './../../Hook/useAxiosPublic';



const AllProperties = () => {
    
    const [isLoading, setIsLoading] = useState(false)


    const axiosPublic = useAxiosPublic()
    const [itemsPerPage, setItemsPerPage] = useState(6)
    const [currentPage, setCurrentPage] = useState(0)  
    const {count} = useLoaderData()
    // console.log("Total Count",count)
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()]

    const handleItemsChange= e => {
        const val = parseInt(e.target.value) 
        // console.log("val", val)
        
        setItemsPerPage(val)
        setCurrentPage(0)
      }
      const handlePrevPage = () =>{
        if(currentPage>0){
          setCurrentPage(currentPage-1)
        }
      }
      const handleNextPage = () =>{
        if(currentPage < pages.length-1){
          setCurrentPage(currentPage+1)
        }
      }
    
      const [allProducts, setAllProducts] = useState([]);
      useEffect(() => {
    
        setIsLoading(true)
        axiosPublic.get(`/allProducts?page=${currentPage}&size=${itemsPerPage}`)
        .then(res => {
            
          setAllProducts(res.data)
          setIsLoading(false)
          
        })
      }, [axiosPublic,currentPage,itemsPerPage,count]); 







    // const { data: allProducts = [], refetch: refetchAllVerifiedProperties, isLoading } = useQuery({
    //     queryKey: ['allProducts'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get(`/allProducts`)
    //         return res.data
    //     }, enabled: !!localStorage.getItem('access-token')
    // })







    if (isLoading) {
        return (

            <div className='flex flex-col h-screen w-full justify-center items-center'>
                <span className="size-80 loading loading-ball loading-lg"></span>
            </div>

        )
    }








    return (
        <div className="pt-[70px]">

            <div className="text-center py-[35px]">
                <h2 className="text-[25px] lg:text-[30px] text-[hsl(180,6%,15%)] font-bold"> All Products
                </h2>
                <div className="w-[40%] pb-[30px] mx-auto mb-4"><hr /></div>
            </div>




            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">

                {allProducts.map(property => <div key={property._id} className="hover:scale-105 hover:opacity-90 duration-300 relative mb-[1vw] w-full lg:w-[90%] mx-auto rounded-lg overflow-hidden shadow-lg">
                    <img src={property.productImage} alt={property.Title} className="w-full h-[280px] md:h-[280px] lg:h-[300px] object-cover" />
                    <div title="Agent Profile" className="px-[20px] avatar pt-1">
                    </div>
                    <div className="px-[20px]">
                        <div className="font-bold text-2xl mb-2">
                            <span className="font-semibold"></span>
                            {property.productName}</div>
                        <p className="text-gray-700 text-[9px] md:text-[16px]">
                            <span className="font-semibold">Category: </span>{property.category}
                        </p>
                        <p className="text-gray-700 text-[9px] md:text-[16px]">
                            <span className="font-semibold">Ratings:</span> {property.ratings}
                        </p>

                        <p className="text-gray-700 text-[9px] md:text-[16px]">
                            <span className="font-semibold">Creation Date:</span> {property.creationDate}
                        </p>
                        <p className="text-gray-700 text-[9px] md:text-[16px]">
                            <span className="font-semibold">Creation Date:</span> {property.price}
                        </p>
                        <p className="text-gray-700 text-[9px] md:text-[16px]">
                            <span className="font-semibold">Creation Date:</span> {property.brand}
                        </p>
                    </div>

                    <div className="px-[20px]">
                        <Link to={`/propertyDetails/${property._id}`}>
                            <button className="text-[9px] my-4 md:text-[16px] bg-black text-white hover:text-black font-bold btn btn-sm rounded">
                                View Details
                            </button>
                        </Link>
                    </div>
                </div>)
                }
                
                </div>
                
                                <div className="text-center text-white my-6">
                                    <button onClick={handlePrevPage} className="m-1 bg-[#000000] px-3 py-1 rounded-sm">Prev</button>
                                    {
                                        pages.map(page => <button className={`${currentPage === page ? 'm-1 bg-[#000000] px-3 py-1 rounded-sm' : 'm-1 bg-[#000000a6] px-3 py-1 rounded-sm'}`}
                                            onClick={() => setCurrentPage(page)}
                                            key={page}>{page + 1}</button>)
                                    }
                                    <button onClick={handleNextPage} className="m-1 bg-[rgb(0,0,0)] px-3 py-1 rounded-sm">Next</button>
                                    <select value={itemsPerPage} onChange={handleItemsChange} name="" id="" className="bg-[#000000] p-1 rounded">
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                    </select>
                                </div>





        </div>
    );
};

export default AllProperties;