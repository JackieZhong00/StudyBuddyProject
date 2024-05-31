import { useFormContext } from 'react-hook-form'

type LocationComponentProp = {
  label: string
  defaultValue: string
}

export const LocationComponent = ({
  label,
  defaultValue,
}: LocationComponentProp) => {
  const { register } = useFormContext()
  return (
    <div className="p-10 ">
      <label htmlFor={label} className="mr-5">
        Location:
      </label>
      <textarea
        className="border border-solid border-black bg-white rounded-md p-1"
        rows={1}
        cols={30}
        id={label}
        defaultValue={defaultValue}
        {...register(label)}
      />
    </div>
  )
}
