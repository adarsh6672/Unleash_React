import Header from '../../Components/Header'
import SignUpForm from '../../Components/Authentication/SignUpForm'

function UserSignup() {
   
  return (
    <>
        <Header />
        <SignUpForm isCounselor={false} />
    </>
  )
}

export default UserSignup