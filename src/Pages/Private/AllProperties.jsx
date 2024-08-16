


import { Link, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxiosPublic from './../../Hook/useAxiosPublic';

const AllProperties = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [brandFilter, setBrandFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [priceRangeFilter, setPriceRangeFilter] = useState([0, 100000]);
    const [sortOption, setSortOption] = useState(""); // Sorting state
    const [allProducts, setAllProducts] = useState([]);

    const axiosPublic = useAxiosPublic();
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(0);  
    const { count } = useLoaderData();
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    const handleItemsChange = (e) => {
        const val = parseInt(e.target.value);
        setItemsPerPage(val);
        setCurrentPage(0);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        axiosPublic.get(`/allProducts?page=${currentPage}&size=${itemsPerPage}`)
            .then(res => {
                setAllProducts(res.data);
                setIsLoading(false);
            });
    }, [axiosPublic, currentPage, itemsPerPage, count]);

    // Filter products based on search query, brand, category, and price range
    const filteredProducts = allProducts.filter(product => {
        const matchesSearchQuery = product.productName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesBrand = brandFilter ? product.brand === brandFilter : true;
        const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
        const matchesPriceRange = product.price >= priceRangeFilter[0] && product.price <= priceRangeFilter[1];

        return matchesSearchQuery && matchesBrand && matchesCategory && matchesPriceRange;
    });

    // Sort products based on selected sorting option
    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortOption === "price-low-to-high") {
            return a.price - b.price;
        } else if (sortOption === "price-high-to-low") {
            return b.price - a.price;
        } else if (sortOption === "date-newest-first") {
            return new Date(b.creationDate) - new Date(a.creationDate);
        } else {
            return 0;
        }
    });

    if (isLoading) {
        return (
            <div className='flex flex-col h-screen w-full justify-center items-center'>
                <span className="size-80 loading loading-ball loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="pt-[70px]">
            <div className="text-center py-[35px]">
                <h2 className="text-[25px] lg:text-[30px] text-[hsl(180,6%,15%)] font-bold"> All Products </h2>
                <div className="w-[40%] pb-[30px] mx-auto mb-4"><hr /></div>

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search products by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded-md w-[40%] mx-auto mb-4"
                />

                {/* Filters and Sorting */}
                <div className="flex justify-around mb-6">
                    {/* Brand Filter */}
                    <select
                        value={brandFilter}
                        onChange={(e) => setBrandFilter(e.target.value)}
                        className="p-2 border rounded-md"
                    >
                        <option value="">All Brands</option>
                        {Array.from(new Set(allProducts.map(product => product.brand)))
                            .map(brand => <option key={brand} value={brand}>{brand}</option>)}
                    </select>

                    {/* Category Filter */}
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="p-2 border rounded-md"
                    >
                        <option value="">All Categories</option>
                        {Array.from(new Set(allProducts.map(product => product.category)))
                            .map(category => <option key={category} value={category}>{category}</option>)}
                    </select>

                    {/* Price Range Filter */}
                    <select
                        value={priceRangeFilter.join(",")}
                        onChange={(e) => setPriceRangeFilter(e.target.value.split(",").map(Number))}
                        className="p-2 border rounded-md"
                    >
                        <option value="0,100000">All Prices</option>
                        <option value="0,30">$0 - $30</option>
                        <option value="30,60">$30 - $60</option>
                        <option value="60,100">$60 - $100</option>
                        <option value="100,100000">$100 and up</option>
                    </select>

                    {/* Sorting */}
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="p-2 border rounded-md"
                    >
                        <option value="">Sort By</option>
                        <option value="price-low-to-high">Price: Low to High</option>
                        <option value="price-high-to-low">Price: High to Low</option>
                        <option value="date-newest-first">Date Added: Newest First</option>
                    </select>
                </div>
            </div>

            {/* Showcase Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
                {sortedProducts.map(property => (
                    <div key={property._id} className="hover:scale-105 hover:opacity-90 duration-300 relative mb-[1vw] w-full lg:w-[90%] mx-auto rounded-lg overflow-hidden shadow-lg">
                        <img src={property.productImage} alt={property.Title} className="w-full h-[280px] md:h-[250px] object-cover" />
                        <div className="px-[20px]">
                            <div className="font-bold text-xl mb-2">{property.productName}</div>
                            <p className="text-gray-700 text-[9px] md:text-[13px]">
                                <span className="font-semibold">Category: </span>{property.category}
                            </p>
                            <p className="text-gray-700 text-[9px] md:text-[13px]">
                                <span className="font-semibold">Ratings:</span> {property.ratings}
                            </p>
                            <p className="text-gray-700 text-[9px] md:text-[13px]">
                                <span className="font-semibold">Date:</span> {property.creationDate.split(' ')[0]}
                            </p>
                            <p className="text-gray-700 text-[9px] md:text-[13px]">
                                <span className="font-semibold">Price:</span> {property.price}
                            </p>
                            <p className="text-gray-700 text-[9px] md:text-[13px]">
                                <span className="font-semibold">Brand:</span> {property.brand}
                            </p>
                        </div>
                        <div className="px-[20px]">
                            <Link to={`/productDetails/${property._id}`}>
                                <button className="text-[9px] my-4 md:text-[16px] bg-black text-white hover:text-black font-bold btn btn-sm rounded">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="text-center text-white my-6">
                <button onClick={handlePrevPage} className="m-1 bg-[#000000] px-3 py-1 rounded-sm">Prev</button>
                {pages.map(page => (
                    <button
                        className={`${currentPage === page ? 'm-1 bg-[#000000] px-3 py-1 rounded-sm' : 'm-1 bg-[#000000a6] px-3 py-1 rounded-sm'}`}
                        onClick={() => setCurrentPage(page)}
                        key={page}
                    >
                        {page + 1}
                    </button>
                ))}
                <button onClick={handleNextPage} className="m-1 bg-[rgb(0,0,0)] px-3 py-1 rounded-sm">Next</button>
                <select value={itemsPerPage} onChange={handleItemsChange} className="bg-[#000000] p-1 rounded">
                    <option value="9">9</option>
                    <option value="12">12</option>
                    <option value="15">15</option>
                    <option value="21">21</option>
                </select>
            </div>
        </div>
    );
};

export default AllProperties;
