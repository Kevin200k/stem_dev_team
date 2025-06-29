import React from 'react'
import { ChevronLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <section>
      <div className='w-16 h-16 bg-gray-500 flex items-center justify-center rounded-full'>
        <button onClick={ goBack }>
          <ChevronLeft />
        </button>
      </div>

    </section>

  )
}

export default BackButton