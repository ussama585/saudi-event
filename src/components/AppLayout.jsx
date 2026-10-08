import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './home-page/Header'
import RegistrationModal from './home-page/RegistrationModal'
import '../App.css'
import '../assets/scss/riyadh-business-summit.scss'

export default function AppLayout() {
  const { pathname, hash, key } = useLocation()
  const [register, setRegister] = useState(false)
  const [pass, setPass] = useState('Executive Pass')
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash, key])

  const openRegister = (name = 'Executive Pass') => {
    setPass(name)
    setComplete(false)
    setRegister(true)
  }

  const submit = (event) => {
    event.preventDefault()
    setComplete(true)
  }

  return (
    <div className={`app-layout${pathname === '/' ? ' app-layout--banner' : ''}`}>
      <Header openRegister={openRegister} transparent={pathname === '/'} />
      <Outlet context={{ openRegister }} />
      <RegistrationModal
        register={register}
        setRegister={setRegister}
        complete={complete}
        pass={pass}
        setPass={setPass}
        submit={submit}
      />
    </div>
  )
}
