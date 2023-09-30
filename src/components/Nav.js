import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

const Nav = () => {

  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate();
  
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

  return (
    <>
      <NavWrapper $show={show}>
        <Logo
          onClick={goToMainPage}
        >
          <img src="images/logo.svg" alt="logo" />
        </Logo>
        <Input 
          type="text" placeholder='영화를 검색해 주세요.'
          onChange={handleChange}
          value={searchValue}
        />
        <LogIn>Login</LogIn>
      </NavWrapper>
    </>
  )
}

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

}`

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
`




export default Nav