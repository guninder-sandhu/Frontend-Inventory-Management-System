export const TextInput = ({id, label, name,value, onChange,required}) => {
    return (
        <>
            <div className={"flex items-center mb-4 flex-wrap"}>
                <label htmlFor={id} className={"w-auto md:w-32 mr-4 font-medium text-black text-right"}>{label} {required && <span className="text-red-500 ml-1">*</span>}</label>
                <input id={id}
                       name={name}
                       value={value}
                       onChange={onChange}
                       required={required}
                       className={"flex-1 border border-gray-900 rounded px-3 py-2 " +
                           "focus:outline-none focus:ring-2 focus:ring-blue-500 " +
                           "bg-white"}/>
            </div>
        </>
    )
}