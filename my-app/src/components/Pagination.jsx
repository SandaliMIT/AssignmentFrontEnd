import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pagination() {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);

    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [photoFileName, setPhotoFileName] = useState("");
    const [clickedEdit, setClickedEdit] = useState(true);
    const [addDisable, setAddDisable] = useState(false);

    useEffect(() => {
        (async () => await load())();
    }, []);

    async function load() {
        const result = await axios.get("https://localhost:44302/api/Product/Getproduct/");
        setProducts(result.data);
    }

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handlePage = (page) => {
        setCurrentPage(page);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = products.slice(startIndex, endIndex);

    const tableRows = () => {
        <tbody>
            {currentItems.map((item) => (
                <tr key={item.productId}>
                    <td>{item.productId}</td>
                    <td>{item.productName}</td>
                    <td>{item.description}</td>
                    <td>{item.createdDate}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>{item.photoFileName}</td>
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


    return (
        <>
            {pagination()}
        </>
    )
}

export default Pagination
