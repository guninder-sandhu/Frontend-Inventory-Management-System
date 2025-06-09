import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useLocation } from "react-router-dom";
import { FormInput } from "../components/FormComponents/FormInput.jsx";
import { Loading } from "../components/Loading.jsx";
import axios from "axios";

export const ProductDetailPage = () => {
    const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
    const { productCode } = useParams();
    const location = useLocation();

    const [formData, setFormData] = useState(null);
    const [categories, setCategories] = useState([]);
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        if (location.state) {
            setFormData(formatData(location.state));
        } else {
            fetchProductData();
        }
        fetchCategories();
    }, []);

    const formatData = (data) => ({
        productName: data.productName || "",
        sku: data.sku || "",
        price: data.productPrice?.toString() || "",
        description: data.productDescription || "",
        stock: data.quantity?.toString() || data.stockQuantity?.toString() || "",
        category: data.productCategoryName || "",
        productCode: data.productCode || "",
        productId: data.productId || "",
        status: data.status || "",
    });

    const fetchProductData = async () => {
        const token = await getAccessTokenSilently();
        const res = await axios.get(`http://localhost:8085/product/code/${productCode}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = res.data.data;
        setFormData(formatData(data, res.data.timestamp));
    };

    const fetchCategories = async () => {
        const token = await getAccessTokenSilently();
        const res = await axios.get("http://localhost:8085/product-category", {
            headers: { Authorization: `Bearer ${token}` }
        });
        const cats = res.data.data.map(c => ({
            label: c.productCategoryName,
            value: c.productCategoryName
        }));
        setCategories(cats);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        const token = await getAccessTokenSilently();
        const dto = {
            productName: formData.productName,
            productDescription: formData.description,
            productPrice: parseFloat(formData.price),
            productCategoryName: formData.category,
            stockQuantity: parseInt(formData.stock),
            sku: formData.sku
        };
        console.log(dto);
        await axios.post(`http://localhost:8085/product/update/${productCode}`, dto, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setEditable(false);
    };

    if (isLoading || !formData) return <Loading />;

    const fields = [
        { id: 'productCode', name: 'productCode', label: 'Product Code', disabled: true },
        { id: 'status', name: 'status', label: 'Status', disabled: true },
        { id: 'productName', name: 'productName', label: 'Product Name', required: true, disabled: !editable },
        { id: 'sku', name: 'sku', label: 'SKU', required: false, disabled: !editable },
        { id: 'price', name: 'price', label: 'Price', required: true, disabled: !editable },
        { id: 'description', name: 'description', label: 'Description', required: false, disabled: !editable },
        { id: 'stock', name: 'stock', label: 'Stock Quantity', required: true, disabled: !editable },
        {
            id: 'category',
            name: 'category',
            label: 'Category',
            type: 'dropdown',
            options: categories,
            required: true,
            disabled: !editable
        }
    ];

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-violet-200 rounded-lg shadow-lg p-10">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Product Details</h2>
                <FormInput
                    fields={fields}
                    formData={formData}
                    onChange={handleChange}
                />

                <div className="flex justify-center gap-4 mt-6">
                    {editable ? (
                        <button
                            onClick={handleUpdate}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Update
                        </button>
                    ) : (
                        <button
                            onClick={() => setEditable(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
