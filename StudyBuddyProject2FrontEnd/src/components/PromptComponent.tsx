import { useFormContext} from 'react-hook-form'

type PromptComponentProp = {
  name: string
  label: string
  defaultValue: string
}

export const PromptComponent = ({name, label, defaultValue}: PromptComponentProp) => {
    const { register } = useFormContext()
  return (
    <div className="p-10 inline-block w-1/2">
      <label htmlFor={name}>
        {label}
      </label>
      <textarea
        rows={5}
        cols={50}
        id={name}
        defaultValue = {defaultValue}
        className="border border-solid border-white rounded-md bg-white block"
        {...register(name)}
      />
    </div>
  )
}