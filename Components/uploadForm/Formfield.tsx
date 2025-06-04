import { FormFieldtype } from '@/index'
import React from 'react'


const Formfield = ({ id, label, value, onChange, placeholder, as = "input", options = [] }: FormFieldtype) => {


  const CSSProps = {
    id,
    label,
    placeholder,
    className: "outline-none border-2 h-12 rounded-4xl placeholder:text-gray-500 border-gray-20 focus:border-purple-800 placeholder:font-medium py-2.5 px-4.5 text-base font-semibold "
  }
  return (
    <div className='flex flex-col gap-2'>
      <label className='font-Julius' htmlFor={id}>{label}</label>
      {as === 'textarea' ? (


        <textarea
          {...CSSProps}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : as === 'select' ? (

        <select
          {...CSSProps}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
        >
          {options.map(({ label, value }) => (
            <option key={label} value={value}>{label}</option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )
      }
    </div>
  )
}

export default Formfield