import React from 'react'
import queries from '../services/users/queries'
import { useQuery, useMutation } from '@apollo/client'

const Users = () => {
  const { loading, data, refetch } = useQuery(queries.GET_ALL_USERS)

  return (
    <div>
      {data?.users?.map((user, i) => (
        <div className='text-center p-4 rounded-mg' key={i}>
          <h2 className='font-bold text-sm'>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user._id}</p>
        </div>
      ))}

      {/* {JSON.stringify(data, null, 2)} */}
    </div>
  )
}

export default Users
