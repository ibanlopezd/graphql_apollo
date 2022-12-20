import { useKeycloak } from '@react-keycloak/web'
import { useRouter } from 'next/router'
import { Envelope, Key, LockKeyOpen } from 'phosphor-react'
import React, { FormEvent, useEffect, useState } from 'react'
import { MoonLoader } from 'react-spinners'

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [formData, setFormData] = useState<{email: string, password: string}>({
    email: '',
    password: ''
  })

  const { keycloak } = useKeycloak()
  const router = useRouter()

  useEffect( () => {
    if(keycloak.authenticated) {
      router.push('/dashboard')
    }
    setIsLoading(false)
  }, [router, keycloak.authenticated])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (res && res.status === 200) {
      router.push('/dashboard')
    }
  }
  
  return (
    <main
      className="w-screen h-screen flex items-center justify-end p-8 md:pr-[48px] select-none"
    >
      {isLoading ? (
        <div className='w-full h-full flex flex-col gap-10 items-center justify-center text-white font-bold text-2xl'>
            <MoonLoader color="#FFFFFF" size={72} />
            Verfiying your login details, please wait
        </div>
      ) :  (
        <div className="w-full h-full md:w-2/4 md:h-2/4 lg:w-1/4 border border-gray-700 rounded-xl bg-gray-800 flex flex-col">
          <h1 className='flex items-center gap-4 w-full p-4 text-xl font-bold border-b border-gray-700'>
            <LockKeyOpen size={36} /> Enter your Vault
          </h1>
          <form
            onSubmit={onSubmit}
            className='flex flex-col p-6 h-full items-center justify-between'
          >
            <div className='w-full h-full flex-1 flex items-center justify-start gap-12 flex-col pt-10'>
                <div className='w-3/4 relative'>
                  <input 
                    type="email"
                    required
                    className='h-[40px] w-full rounded bg-gray-700 text-white p-2'
                    placeholder='Type your Email'
                    value={formData.email}
                    onChange={e => setFormData({ email: e.target.value, password: formData.password })}
                  />
                  <Envelope size={24} className="absolute right-2 top-2" />
                </div>
                <div className='w-3/4 relative'>
                  <input 
                    type="password"
                    required
                    className='h-[40px] w-full rounded bg-gray-700 text-white p-2'
                    placeholder='Type your Password'
                    value={formData.password}
                    onChange={e => setFormData({ password: e.target.value, email: formData.email })}
                  />
                  <Key size={24} className="absolute right-2 top-2" />
                </div>
            </div>
            <button type="submit" className='mb-10 rounded bg-green-500 text-gray-900 w-full h-[40px] font-bold hover:bg-transparent hover:text-green-500 hover:border-green-500 hover:border transition-colors'>
                Access
            </button>
          </form>
        </div>
      )}
    </main>
  )
}

export { LoginScreen }