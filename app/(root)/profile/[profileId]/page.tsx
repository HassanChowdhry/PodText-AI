import React from 'react'

export default function Profile({ params: { profileId } }: { params: { profileId: string }}) {
  return (
    <div className='text-white-1'>
      Profile for {profileId}
    </div>
  )
}
