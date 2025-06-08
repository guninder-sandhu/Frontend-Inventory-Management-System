import {FormInput} from "../components/FormComponents/FormInput.jsx";
import {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";
import {Loading} from "../components/Loading.jsx";

export const AddProductPage = () => {
    const {getAccessTokenSilently, isAuthenticated, isLoading} = useAuth0();
    const [productCategories, setProductCategories] = useState([""]);

    const productFields = [
        {id: 'productName', name: 'productName', label: 'Product Name',required: true},
        {id: 'sku', name: 'sku', label: 'SKU',required: true},
        {id: 'price', name: 'price', label: 'Price',required: true},
        {id: 'description', name: 'description', label: 'Description',required: false},
        {id: 'stock', name: 'stock', label: 'Stock Quantity',required: true},
        { id: 'category', name: 'category', label: 'Category', type: 'dropdown', options: productCategories, required: true }
    ];

    const [formData, setFormData] = useState({
        productName: '',
        sku: '',
        price: '',
        description: '',
        stock: '',
        category: ''
    });

    function onChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(prevState =>  ({
            ...prevState,
            [name]: value
        }))
    }

    function onSubmit(e) {
        e.preventDefault();
        console.log(formData)
        // Map frontend formData to backend DTO fields
        const dto = {
            productName: formData.productName,
            productDescription: formData.description,
            productPrice: parseFloat(formData.price),
            productCategoryName: formData.category,
            stockQuantity: parseInt(formData.stock)
        };

        getAccessTokenSilently().then(token => {
            return axios.post("http://localhost:8085/product", dto, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
        }).then(response => {
            console.log("Product created:", response.data);
        }).catch(error => {
            console.error("Error creating product:", error);
        });
    }

    useEffect(() => {
        if(!isLoading && isAuthenticated){
            getAccessTokenSilently()
                .then(token => {
                    return axios.get("http://localhost:8085/product-category",{
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    })
                }).then(response=>{
                    console.log("got data ",response.data)
                const categories = response.data.data.map(category => ({
                    label: category.productCategoryName,
                    value: category.productCategoryName
                }));

                setProductCategories(categories)
            }).catch(err=>{
                console.log(err);
            })
        }
    }, [getAccessTokenSilently, isAuthenticated, isLoading]);

    if(isLoading){
        return <Loading />
    }

    return (
        <>
            <div className="w-full max-w-3xl">
                <div className="bg-violet-200 rounded-lg shadow-lg p-10 w-full max-w-4xl">
                    <FormInput fields={productFields}
                               title="Add New Product"
                               formData={formData}
                               onChange={onChange}
                               onSubmit={onSubmit}/>
                </div>
            </div>

        </>
    )
}