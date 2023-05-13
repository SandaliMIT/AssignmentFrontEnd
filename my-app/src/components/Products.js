import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Products() {

    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [photoFileName, setPhotoFileName] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => await load())();
    }, []);

    async function load() {
        const result = await axios.get("https://localhost:44302/api/Product/Getproduct/");
        setProducts(result.data);
        console.log(result.data);
    }

    async function saveProduct(event) {
        // event.preventdefault();
        try{
            await axios.post("https://localhost:44302/api/Product/AddProduct/", {
                productName: productName,
                description: description,
                category: category,
                price: price,
                photoFileName: photoFileName,
            });
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
        setProductName(data.productName);
        setDescription(data.description);
        setCategory(data.category);
        setPrice(data.price);
        setPhotoFileName(data.photoFileName);
    }

    async function deleteProduct(id) {
        await axios.delete("https://localhost:44302/api/Product/DeleteProduct/"+id);
        alert("Product is deleted");
            setProductId("");
            setProductName("");
            setDescription("");
            setCategory("");
            setPrice("");
            setPhotoFileName("");
        load();
    }

    async function UpdateProduct(event) {
        // event.preventdefault();
        try {
            await axios.patch("https://localhost:44302/api/Product/UpdateProduct/"+products.find((p) => p.productId === productId).productId || productId,
                {
                    productId: productId,
                    productName: productName,
                    description: description,
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
        } catch(error) {
            alert(error);
        }
    }

    return (
        <diV>

            <h1>Product Details</h1>
            <div className='container mt-4'>
                <form>
                    <div className='form-group'>
                        <label>Product name</label>
                        <input 
                            type='text' 
                            className='form-control' 
                            id='id' 
                            value={productName}
                            onChange={(event) => {
                                setProductName(event.target.value);
                            }}>                           
                        </input>

                        <label>Product description</label>
                        <input 
                            type='text' 
                            className='form-control' 
                            id='id'
                            value={description}
                            onChange={(event) => {
                                setDescription(event.target.value);
                            }}>
                        </input>

                        <label>Category</label>
                        <input 
                            type='text' 
                            className='form-control' 
                            id='id'
                            value={category}
                            onChange={(event) => {
                                setCategory(event.target.value);
                            }}>
                        </input>

                        <label>Price</label>
                        <input 
                            type='text' 
                            className='form-control' 
                            id='id'
                            value={price}
                            onChange={(event) => {
                                setPrice(event.target.value);
                            }}>
                        </input>

                        <label>Photo file name</label>
                        <input 
                            type='text' 
                            className='form-control' 
                            id='id'
                            value={photoFileName}
                            onChange={(event) => {
                                setPhotoFileName(event.target.value);
                            }}>
                        </input>
                    </div>
                    <div>
                        <button className='btn btn-primary mt-4' onClick={saveProduct}>
                            Add
                        </button>
                        <button className='btn btn-success mt-4' onClick={UpdateProduct}>
                            Update
                        </button>
                    </div>
                </form>
            </div>

         <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>
                                ProductId
                            </th>
                            <th>
                                ProductName
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                                CreatedDate
                            </th>
                            <th>
                                Category
                            </th>
                            <th>
                                Price
                            </th>
                            <th>
                                PhotoFileName
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(prod =>
                            <tr key={prod.productId}>
                                <td>{prod.productId}</td>
                                <td>{prod.productName}</td>
                                <td>{prod.description}</td>
                                <td>{prod.createdDate}</td>
                                <td>{prod.category}</td>
                                <td>{prod.price}</td>
                                <td>{prod.photoFileName}</td>
                                <td>
                                    <button type='button' className='btn btn-success mr-1' onClick={() => editProduct(prod)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    <button type='button' className='btn btn-danger mr-1' onClick={() => deleteProduct(prod.productId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
        </diV>
    )
}

export default Products