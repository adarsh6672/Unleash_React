import React from 'react'
import Header from '../../Components/Header'
import SignUpForm from '../../Components/SignUpForm'

function CounselorSignUp() {
  return (
    <>
        <Header />
        <SignUpForm isCounselor={true} />
    </>
  )
}

export default CounselorSignUp