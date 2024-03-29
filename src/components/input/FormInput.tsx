import { IconType } from "react-icons"

interface FormInputProps {
	label: string | (IconType & string)
	name: string
	type: string
	isValid?: boolean
	defaultValue?: string
	autoComplete?: string
	size?: string
	placeholder?: string
	required?: boolean
	id: string
	value: string | number | undefined
	innerRef?: React.RefObject<HTMLInputElement>
	onChange?: (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => void
	onFocus?: (
		event:
			| React.FocusEvent<HTMLInputElement>
			| React.FocusEvent<HTMLTextAreaElement>
	) => void
	onBlur?: (
		event:
			| React.FocusEvent<HTMLInputElement>
			| React.FocusEvent<HTMLTextAreaElement>
	) => void
}

const FormInput = ({
	label,
	name,
	type,
	defaultValue,
	size,
	value,
	required,
	autoComplete,
	id,
	onChange,
	onFocus,
	onBlur,
	placeholder,
	innerRef,
	isValid,
}: FormInputProps) => {
	return (
		<div className="form-control">
			<label htmlFor={name} className="label">
				<span className="capitalize label-text">{label}</span>
			</label>
			<input
				type={type}
				ref={innerRef}
				id={id}
				autoComplete={autoComplete}
				name={name}
				value={value}
				required={required}
				onChange={onChange}
				placeholder={placeholder}
				onBlur={onBlur}
				onFocus={onFocus}
				defaultValue={defaultValue}
				className={`input input-bordered ${size} ${
					isValid && "border-success"
				} `}
			/>
		</div>
	)
}
export default FormInput
