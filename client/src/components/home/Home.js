// import React from 'react'
import { Header } from './header/Header'
import { Dashboard } from './dashboard/Dashboard'
import { CreateUser } from './users/CreateUser'

export const Home = () => {
 
    return (
        <>
            <Header />
            <Dashboard />
            <CreateUser />
        </>
    )
}


