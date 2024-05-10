import React, { useContext } from 'react'
import { Button, WindmillContext } from '@windmill/react-ui'

export default function Header() {
    const { mode, toggleMode } = useContext(WindmillContext)
    return (
        <>
            <Button onClick={toggleMode}>Toggle theme</Button>
            <p>Current theme is: {mode}</p></>
    )
}