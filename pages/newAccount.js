import React from 'react'

export default function NewAcount () {
  console.log('paso x aqui :>> ')
  const handleCreate = async () => {
    const res = await fetch('/api/accounts', {
      method: 'POST',
      // body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const account = await res.json()
    console.log('🚀 ~ handleCreate ~ account:', account)
    window.location = account.url
  }
  return (
    <div>
      <h1>Create a new account</h1>
      <button
        className='bg-green-400 text-white px-3 py-1 rounded-md mt-4 w-full'
        onClick={() => handleCreate()}
      >
        Click here to create a new acount!
      </button>
    </div>
  )
}
