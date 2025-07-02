import React from 'react'
import LeaderBoard from '../components/LeaderBoard'
import BackButton from '../components/BackButton'


const LeaderBoardView = () => {
  return (
    <div>
      <div>
        <BackButton />
      </div>
      <div className='m-auto'>
        <LeaderBoard />
      </div>
    </div>
  )
}

export default LeaderBoardView