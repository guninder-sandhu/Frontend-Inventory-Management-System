import { FormInput } from "../components/FormComponents/FormInput.jsx";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Loading } from "../components/Loading.jsx";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AddProductPage = () => {
    const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
    const [bulkResult, setBulkResult] = useState(null);

    const emptyForm = {
        productName: '',
        sku: '',
        price: '',
        description: '',
        stock: '',
        category: ''
    };

    const [productCategories, setProductCategories] = useState([]);
    const [productForms, setProductForms] = useState([{ ...emptyForm }]);

    const productFields = [
        { id: 'productName', name: 'productName', label: 'Product Name', required: true },
        { id: 'sku', name: 'sku', label: 'SKU', required: true },
        { id: 'price', name: 'price', label: 'Price', required: true },
        { id: 'description', name: 'description', label: 'Description', required: false },
        { id: 'stock', name: 'stock', label: 'Stock Quantity', required: true },
        {
            id: 'category',
            name: 'category',
            label: 'Category',
            type: 'dropdown',
            options: productCategories,
            required: true
        }
    ];

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            getAccessTokenSilently()
                .then(token =>
                    axios.get("http://localhost:8085/product-category", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                )
                .then(response => {
                    const categories = response.data.data.map(category => ({
                        label: category.productCategoryName,
                        value: category.productCategoryName
                    }));
                    setProductCategories(categories);
                })
                .catch(err => {
                    console.error("Error fetching categories:", err);
                });
        }
    }, [getAccessTokenSilently, isAuthenticated, isLoading]);

    const addNewProductForm = () => {
        if (productForms.length >= 10) {
            alert("You can only add up to 10 products manually. For bulk upload, please use the CSV option.");
            return;
        }
        setProductForms(prev => [...prev, { ...emptyForm }]);
    };

    const removeProductForm = (index) => {
        const updatedForms = [...productForms];
        updatedForms.splice(index, 1);
        setProductForms(updatedForms);
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedForms = [...productForms];
        updatedForms[index][name] = value;
        setProductForms(updatedForms);
    };

    const onSubmitAll = (e) => {
        e.preventDefault();
        console.log("submit all")
        const dtoList = productForms.map(formData => ({
            productName: formData.productName,
            productDescription: formData.description,
            productPrice: parseFloat(formData.price),
            productCategoryName: formData.category,
            stockQuantity: parseInt(formData.stock),
            sku: formData.sku
        }));

        getAccessTokenSilently()
            .then(token =>
                axios.post("http://localhost:8085/product/bulk-create", dtoList, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
            )
            .then(response => {
                console.log("Products created:", response.data);
                setBulkResult(response.data);
                setProductForms([{ ...emptyForm }]);
            })
            .catch(error => {
                console.error("Error creating products:", error);
                setBulkResult({
                    message: "Bulk create failed",
                    status: 500,
                    timestamp: new Date().toISOString(),
                    data: { successCount: 0, failedCount: productForms.length }
                });
            });
    };

    const onSubmitSingle = (e, index) => {
        e.preventDefault();
        console.log("submit one")

        const formData = productForms[index];
        const dto = {
            productName: formData.productName,
            productDescription: formData.description,
            productPrice: parseFloat(formData.price),
            productCategoryName: formData.category,
            stockQuantity: parseInt(formData.stock),
            sku: formData.sku
        };

        getAccessTokenSilently()
            .then(token =>
                axios.post("http://localhost:8085/product", dto, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
            )
            .then(response => {
                console.log("Product created:", response.data);
                navigate(`/product-detail/${response.data.data.productCode}`, {
                    state: response.data.data
                });
            })
            .catch(error => {
                console.error("Error creating product:", error);
            });
    };

    const handleCSVUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        getAccessTokenSilently()
            .then(token =>
                axios.post("http://localhost:8085/product/upload-csv", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                })
            )
            .then(response => {
                console.log("CSV upload success:", response.data);
            })
            .catch(error => {
                console.error("CSV upload error:", error);
            });
    };

    if (isLoading) return <Loading />;

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-violet-200 rounded-lg shadow-lg p-10">
                {bulkResult && (
                    <div className={`mb-4 p-4 rounded ${bulkResult.data.failedCount > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {bulkResult.data.failedCount > 0
                            ? `${bulkResult.data.failedCount} products failed to create. ${bulkResult.data.successCount} succeeded.`
                            : 'All products created successfully!'}
                    </div>
                )}
                <div className="flex justify-between items-center mb-3">
                    <button
                        onClick={addNewProductForm}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        + Add Product
                    </button>

                    <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
                        Upload CSV
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleCSVUpload}
                            className="hidden"
                        />
                    </label>
                </div>

                <p className="text-sm text-gray-700 mb-6">
                    You can add up to <strong>10 products</strong> manually. For more, please use the CSV upload.
                </p>

                <form onSubmit={(e) => productForms.length === 1 ? onSubmitSingle(e, 0) : onSubmitAll(e)}>
                    {productForms.map((formData, index) => (
                        <div key={index} className="relative mb-8 border border-gray-300 rounded-lg p-6 shadow-md bg-violet-100/70">

                        {productForms.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeProductForm(index)}
                                    className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
                                >
                                    <X size={20} />
                                </button>
                            )}
                            <FormInput
                                fields={productFields}
                                title={`Product ${index + 1}`}
                                formData={formData}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                    ))}
                    <div className="flex justify-center">
                        {productForms.length === 1 ? (
                            <button
                                type="submit"
                                className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800"
                            >
                                Submit
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800"
                            >
                                Submit All
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};
