import {TextInput} from "./TextInput.jsx";
import {Dropdown} from "./DropDown.jsx";

export const FormInput = ({fields, title, formData, onChange}) => {
    return (
        <>
            <div className="flex flex-col gap-4">
                {title && (
                    <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
                )}
                {fields.map((field) =>
                    field.type === "dropdown" ? (
                        <Dropdown
                            key={field.id}
                            id={field.id}
                            label={field.label}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={onChange}
                            options={field.options}
                            required={field.required}
                            disabled={field.disabled}
                        />
                    ):(
                    <TextInput
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={onChange}
                        required={field.required}
                        disabled={field.disabled}
                    />

                ))}
            </div>
        </>
    )
}