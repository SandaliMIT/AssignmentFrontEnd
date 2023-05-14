import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';

function Products() {

    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [photoFileName, setPhotoFileName] = useState(null);
    const [products, setProducts] = useState([]);
    const [clickedEdit, setClickedEdit] = useState(true);
    const [addDisable, setAddDisable] = useState(false);
    const [sortConfig, setSortConfig] = useState({
        key: '',
        direction: '',
    });
    //search
    const [searchQuery, setSearchQuery] = useState("");
    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    //image
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        (async () => await load())();
        // const fetchImage = async () => {
        //     try {
        //         const res = await axios.get("https://localhost:44302/api/Product/image/"+photoFileName);
        //         setImageData(res.data);
        //     } catch (error) {
        //         console.error("Error fetching image : ", error)
        //     }
        // };
        // fetchImage();
    }, []);

    async function load() {
        const result = await axios.get("https://localhost:44302/api/Product/Getproduct/");
        setProducts(result.data);
        console.log(result.data);
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    async function saveProduct(event) {
        // const formData = new FormData();
        // formData.append('image', photoFileName);
        // console.log(formData, "/./,..,,")

        // try {
        //     const response = await axios.post("https://localhost:44302/api/Product/AddProduct/", formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //         params: {
        //             productName: productName,
        //             description: description,
        //             createdDate: formattedDate,
        //             category: category,
        //             price: price,
        //             // photoFileName: photoFileName,
        //         },
        //     });
        //     alert("Product is added to the inventory !");
        //     setProductId("");
        //     setProductName("");
        //     setDescription("");
        //     setCategory("");
        //     setPrice("");
        //     setPhotoFileName("");
        //     load();

        //     console.log('Success', response.data);
        // } catch (error) {
        //     alert(error);
        // }
        let data = {
            productName: productName,
            description: description,
            createdDate: formattedDate,
            category: category,
            price: price,
            photoFileName: photoFileName,
        }

        try {
            await axios.post("https://localhost:44302/api/Product/AddProduct/", data);
            alert("Product is added to the inventory !");
            setProductId("");
            setProductName("");
            setDescription("");
            setCategory("");
            setPrice("");
            setPhotoFileName("");
            load();
        } catch (error) {
            alert(error);
        }
    }

    async function editProduct(data) {
        setClickedEdit(false);
        setAddDisable(true);
        setProductId(data.productId);
        setProductName(data.productName);
        setDescription(data.description);
        setCategory(data.category);
        setPrice(data.price);
        setPhotoFileName(data.photoFileName);
    }

    async function deleteProduct(id) {

        const confirmed = window.confirm('Are you sure to delete this product ?');
        if (confirmed) {
            await axios.delete("https://localhost:44302/api/Product/DeleteProduct/" + id);
            alert("Product is deleted");
            setProductId("");
            setProductName("");
            setDescription("");
            setCategory("");
            setPrice("");
            setPhotoFileName("");
            load();
        }
    }

    async function UpdateProduct(event) {
        try {
            await axios.patch("https://localhost:44302/api/Product/UpdateProduct/" + products.find((p) => p.productId === productId).productId || productId,
                {
                    productId: productId,
                    productName: productName,
                    description: description,
                    createdDate: formattedDate,
                    category: category,
                    price: price,
                    photoFileName: photoFileName,
                }
            );
            alert("Product is updated !");
            setProductId("");
            setProductName("");
            setDescription("");
            setCategory("");
            setPrice("");
            setPhotoFileName("");
            load();
        } catch (error) {
            alert(error);
        }
    }

    // Sort
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        const sortedData = [...products].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setProducts(sortedData);
        setSortConfig({ key, direction });
    }

    const tableHeader = () => {
        const headers = [
            { label: 'ProductId', key: 'productId' },
            { label: 'ProductName', key: 'productName' },
            { label: 'Description', key: 'description' },
            { label: 'CreatedDate', key: 'createdDate' },
            { label: 'Category', key: 'category' },
            { label: 'Price', key: 'price' },
            { label: 'Image', key: 'image' },
            { label: 'Actions', key: 'actions' },
        ];

        return (
            <thead>
            <tr>
                {headers.map((header) => (
                    <th key={header.key} onClick={() => handleSort(header.key)}>
                        {header.label + (sortConfig.key === header.key ? '' : '  ↕ ')}
                        {sortConfig.key === header.key && (
                            <span>{sortConfig.direction === 'asc' ? '  ↑' : '  ↓'}</span>
                        )}
                    </th>
                ))}
            </tr>
            </thead>
        );
    }

    // Search
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    }

    const filteredData = products.filter((item) => {
        return (
            item.productName.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
            item.createdDate.includes(searchQuery) || ''
        );
    });

    const searchInput = () => {
        return (
            <div>
                <input
                    type='text'
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder='Search...'
                />
            </div>
        );
    }

    //pagination
    const handlePage = (page) => {
        setCurrentPage(page);
    }

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredData.slice(startIndex, endIndex);

    const tableRows = () => {
        return (
            <tbody>
            {currentItems.map((item) => (
                <tr key={item.productId}>
                    <td>{item.productId}</td>
                    <td>{item.productName}</td>
                    <td>{item.description}</td>
                    <td>{item.createdDate}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>
                        {item.photoFileName}
                        {/* {imageData && <img src={`data:image/png;base64,${imageData}`} />} */}
                    </td>
                    <td>
                        <button type='button' className='btn btn-success mr-1' onClick={() => editProduct(item)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                        </button>
                        <button type='button' className='btn btn-danger mr-1' onClick={() => deleteProduct(item.productId)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                            </svg>
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
        );
    }

    const pagination = () => {
        const pageButtons = [];
        for (let i = 1; i <= totalPages; i++) {
            pageButtons.push(
                <button
                    key={i}
                    onClick={() => handlePage(i)}
                    className={currentPage === i ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }
        return <div className='pagination'>{pageButtons}</div>
    }

    //image

    return (
        <div>

            <h1>Product Details</h1>
            <div className='container mt-4'>
                    <div className='form-group'>
                        <input
                            type='hidden'
                            className='form-control'
                            value={productId}
                            onChange={(event) => {
                                setProductId(event.target.value);
                            }}>
                        </input>
                        <label>Product name</label>
                        <input
                            type='text'
                            className='form-control'
                            value={productName}
                            onChange={(event) => {
                                setProductName(event.target.value);
                            }}>
                        </input>

                        <label>Product description</label>
                        <input
                            type='text'
                            className='form-control'
                            value={description}
                            onChange={(event) => {
                                setDescription(event.target.value);
                            }}>
                        </input>

                        <label>Category</label>
                        <input
                            type='text'
                            className='form-control'
                            value={category}
                            onChange={(event) => {
                                setCategory(event.target.value);
                            }}>
                        </input>

                        <label>Price</label>
                        <input
                            type='text'
                            className='form-control'
                            value={price}
                            onChange={(event) => {
                                setPrice(event.target.value);
                            }}>
                        </input>

                        <label>Image</label>
                        <br />

                        <input type='file' onChange={(e) => {setPhotoFileName(e.target.name)}} />
                    </div>
                <div>
                    <button className='btn btn-primary mt-4' onClick={() => { saveProduct() }} disabled={addDisable}>
                        Add
                    </button>
                    <button className='btn btn-success mt-4' onClick={() => { UpdateProduct() }} disabled={clickedEdit}>
                        Update
                    </button>
                </div>
            </div>

            {searchInput()}
            <table className='table table-striped'>
                {tableHeader()}
                {tableRows()}
            </table>
            {pagination()}
        </div>
    )
}

export default Products
