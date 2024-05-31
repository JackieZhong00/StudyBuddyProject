import { ProfileFormData } from "./Profile"
import { useForm, SubmitHandler, useController } from 'react-hook-form'

type PromptComponentProp = {
  label: string
  register: UseFormRegister<ProfileFormData>
}

export const PromptComponent = ({label, register}: PromptComponentProp) => {

  return (
    <div className="p-10">
      <label htmlFor="hobbiesPrompt">
        Outside of studying/working, what do you like to do for fun?
      </label>
      <textarea
        rows={2}
        cols={50}
        id="hobbiesPrompt"
        className="border border-solid border-white rounded-md bg-white block"
        {...register('hobbiesPrompt')}
      />
    </div>
  )
}