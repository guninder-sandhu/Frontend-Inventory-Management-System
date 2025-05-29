import {TextInput} from "./TextInput.jsx";

export const FormInput = ({fields, title, formData, onChange, onSubmit}) => {
    return (
        <>
            <form className={"flex flex-col gap-4"} onSubmit={onSubmit}>
                {title && (
                    <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
                )}
                {fields.map((field) => (
                    <TextInput
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={onChange}
                        required={field.required}
                    />

                ))}
                <button type="submit" className="mt-6 px-6 py-2 bg-violet-950 text-white rounded">
                    Submit
                </button>
            </form>
        </>
    )
}