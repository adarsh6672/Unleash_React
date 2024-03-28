import Header from '../../Components/Header'
import SignUpForm from '../../Components/SignUpForm'

function UserSignup() {
   
  return (
    <>
        <Header />
        <SignUpForm isCounselor={false} />
    </>
  )
}

export default UserSignup