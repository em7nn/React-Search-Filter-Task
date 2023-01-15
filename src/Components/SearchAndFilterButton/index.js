
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./index.scss"

function SearchAndFilterButton() {
    const [data, setData] = useState([])
    const [posts, setPosts] = useState(false)
    const [Search, setSearch] = useState("")
    useEffect(() => {
        const loadPosts = async () => {
            setPosts(true);
            const response = await axios.get(
                "https://northwind.vercel.app/api/products"
            );
            setData(response.data);
            setPosts(false);
        };

        loadPosts();
    }, [])



    return (
        <div className='rowe'>
            <div className='divo'>
                <div className='divoyazi'>
                    <h1>Search Filter</h1>
                </div>
                <div className='divoinpobutto'>
                    <input
                        style={{ width: "30%", height: "26px", border:"none" }}
                        type="text"
                        placeholder="search from here..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className='btn' onClick={() => { setData([...data].sort((a, b) => (a.unitPrice > b.unitPrice) ? 1 : ((b.unitPrice > a.unitPrice) ? -1 : 0))) }}>from cheap to expensive</button>
                    <button className='btn' onClick={() => { setData([...data].sort((a, b) => (a.unitPrice < b.unitPrice) ? 1 : ((b.unitPrice < a.unitPrice) ? -1 : 0))) }}>from expensive to cheap</button>
                </div>
            </div>

            {posts ? (<h4> Loading...</h4>) : (
                data.filter((value) => {
                    if (Search === "") {
                        return value;
                    } else if (value.name.toLowerCase().includes(Search.toLowerCase())) {
                        return value;
                    }
                })
                    .map((item) => <div className='ro' key={item.id}>
                        <div className="products">
                            <div className="product">
                                <img style={{ width: "250px", height:"250px" }} src="https://piotavola.com/wp-content/uploads/2020/05/tshirt-2.jpg" />
                                <h3>Name : {item.name}</h3>
                                <h4 className="price">
                                    Price : {item.unitPrice}
                                </h4>
                            </div>
                        </div>
                    </div>)
            )}
        </div>
    )
}


export default SearchAndFilterButton