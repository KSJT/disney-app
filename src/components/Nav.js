import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components'
import { 
  getAuth,
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithPopup,
  signOut
 } from 'firebase/auth';



const Nav = () => {

  const initialUserData = localStorage.getItem('userData') ? 
  JSON.parse(localStorage.getItem('userData')) : {}

  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [userData, setUserData] = useState(initialUserData);



  const listener = () => {
    if(window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listener);
      return () => {
        window.removeEventListener('scroll', listener);
      }
  }, [])
  

  const handleChange = (event) => {
    setSearchValue(event.target.value); // 작성 중인 값이 들어있는 이벤트 객체
    navigate(`/search?q=${event.target.value}`)
  }

  const goToMainPage = () => {
    navigate('/main')
  }

  // localhost:3000/search?q={event.target.value}

  const handleAuth = () => {
    signInWithPopup(auth, provider)
    .then(result => {
      console.log(result.user.displayName, result.user.email, result.user.photoURL);
      setUserData(result.user);
      localStorage.setItem('userData', JSON.stringify(result.user));
    })
    .catch(error => {
      console.error(error);
    })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        if(pathname === "/") {
          navigate('/main');
        } 
      } else {
          navigate("/");
        }
      })
    }, [auth, navigate, pathname]);


    const handleSignOut = () => {
      signOut(auth)
      .then(() => {
        setUserData({});
        navigate('/');
      })
      .catch(error => {
        console.error(error);
      });
    }

  return (
    <>
      <NavWrapper $show={show}>
        <Logo
          onClick={goToMainPage}
        >
          <img src="images/logo.svg" alt="logo" />
        </Logo>
      

        {pathname === "/" ? 
        (
          <LogIn
          onClick={handleAuth}>Login</LogIn>
        ) :
        <>
        <Input 
          type="text" placeholder='영화를 검색해 주세요.'
          onChange={handleChange}
          value={searchValue}
          className="nav__input"
        />
        <SignOut>
          <UserImage src={userData.photoURL} alt={userData.displayName} />
          <DropDown>
            <span onClick={handleSignOut}>Sign Out</span>
          </DropDown>
        </SignOut>
        </>
        }
      </NavWrapper>
    </>
  )
}


const DropDown = styled.div`
  position: absolute;
  top: 60px;
  right: -30px;
  background-color: rgba(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 /50%) 0px 0px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 80px;
  text-align: center;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  margin-right: 80px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const UserImage = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const LogIn = styled.a`
background-color: rgba(0, 0, 0, 0.6);
padding: 8px 16px;
border: 1px solid #f9f9f9;
border-radius: 4px;
transition: all 0.2s ease;
margin-right: 80px;
width: 102px;

  &:hover {
  background-color: #f9f9f9;
  color: #000;
  border: transparent;
}`;

const Input = styled.input`
position: fixed;
left: 50%;
transform: translateX(-50%);
background-color: rgba(0, 0, 0, 0.5);
border-radius: 5px;
padding: 5px;
color: white;
border: 1px solid lightgray;
`;

const Logo = styled.a`
padding: 0;
width: 80px;
margin-top: 4px;
max-height: 70px;
font-size: 0;
display: inline-block;
cursor: pointer;

img {
    display: block;
    width: 100%;

}`;

const NavWrapper = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  height: 70px;
  background-color: ${props => props.show ? '#090b13' : 'transparent' };
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;




export default Nav