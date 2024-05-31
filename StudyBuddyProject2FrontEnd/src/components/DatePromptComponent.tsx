import { useFormContext, Controller } from 'react-hook-form'
import Datepicker from 'react-datepicker'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'


type DatePromptProp = {
  dateLabel: string
  defaultDate: Date
}


export const DatePromptComponent = ({dateLabel, defaultDate}:DatePromptProp) => {
  

  const [date, setDate] = useState(new Date())
  const { control } = useFormContext()
  
  return (
    <div className="p-10 inline">
      <label htmlFor="date" className="form-label mr-5">
        Date:
      </label>
      <Controller
        control={control}
        name={dateLabel}
        render={({ field }) => (
          <Datepicker
            placeholderText="Select date"
            onChange={(date) => field.onChange(date)}
            selected={field.value ? field.value : defaultDate}
            className="border border-solid border-black rounded-md p-1 mr-10 bg-white "
          />
        )}
      />
    </div>
  )
}
