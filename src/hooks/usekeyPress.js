import { useState, useEffect } from "react";

const useKeyPress = (targetKeyCode) => {
    const [keyPressed, setKeyPressed] = useState(false)

    const keyDownHardler = ({ keyCode }) => {
        if (keyCode === targetKeyCode) {
            setKeyPressed(true)
        }
    }

    const keyUpHardler = ({ keyCode }) => {
        if (keyCode === targetKeyCode) {
            setKeyPressed(false)
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", keyDownHardler)
        document.addEventListener("keyup", keyUpHardler)
        return () => {
            document.removeEventListener('keydown', keyDownHardler)
            document.removeEventListener('keyup', keyUpHardler)
        }
    })

    return keyPressed
}

export default useKeyPress;