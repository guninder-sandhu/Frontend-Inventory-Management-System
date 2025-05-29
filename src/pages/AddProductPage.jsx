import {FormInput} from "../components/FormComponents/FormInput.jsx";
import {useState} from "react";

export const AddProductPage = () => {
    const productFields = [
        {id: 'productName', name: 'productName', label: 'Product Name',required: true},
        {id: 'sku', name: 'sku', label: 'SKU',required: true},
        {id: 'price', name: 'price', label: 'Price',required: true},
        {id: 'description', name: 'description', label: 'Description',required: false},
        {id: 'stock', name: 'stock', label: 'Stock Quantity',required: true},
    ];

    const [formData, setFormData] = useState({
        productName: '',
        sku: '',
        price: '',
        description: '',
        stock: ''
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