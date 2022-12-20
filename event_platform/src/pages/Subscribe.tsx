import { gql, useMutation } from '@apollo/client'
import { FormEvent, FormEventHandler, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'

const CREATE_SUBSCRIBER_MUTAION = gql`
    mutation CreateSubscriber ($name: String!, $email: String!) {
        createSubscriber(data: { name: $name, email: $email }) {
            id
        }
}   `

interface FormValues {
    name: string
    email: string
}

const Subscribe = () => {
    const navigate = useNavigate()

    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        email: ''
    })

    const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBER_MUTAION)

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        await createSubscriber({
            variables: formValues
        })

        navigate('/event')
    }

  return (
    <div
        className='min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center'
    >
        <div
            className='w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto'
        >
            <div
                className='max-w-[640px]'
            >
                <Logo />
                <h1 className='mt-8 text-[2.5rem] leading-tight'> 
                    Build a <strong className='text-blue-500'>full App</strong>, from scratch with <strong className='text-blue-500'>React</strong>
                </h1>
                <p className='mt-4 text-gray-200 leading-relaxed'>
                    In a week time only, you will be able to develop, build and deploy a fully working Application using state of art technologies and strategies in order to achieve your professional goals using the most demanded technologies in the market.
                </p>
            </div>

            <div
                className='p-8 bg-gray-700 border border-gray-500 rounded'
            >
                <strong className='text-2xl mb-6 block'>
                    Register for Free
                </strong>

                <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-full'>
                    <input 
                        className="bg-gray-900 rounded px-5 h-14"
                        type="text" 
                        placeholder="Type your Full Name" 
                        value={formValues.name}
                        onChange={ e => setFormValues({ name: e.target.value, email: formValues.email })}
                    />
                    <input 
                        className="bg-gray-900 rounded px-5 h-14"
                        type="email" 
                        placeholder="Type your Email" 
                        value={formValues.email}
                        onChange={ e => setFormValues({ name: formValues.name, email: e.target.value })}
                    />

                    <button
                        className='mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50'
                        type="submit"
                        disabled={loading}
                    >
                        Reserve a Place
                    </button>
                </form>
            </div>
        </div>
        
        <img src="/src/assets/code_mockup.png" className='mt-10' alt="" />
    </div>
  )
}

export default Subscribe