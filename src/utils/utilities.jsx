// import React from "react"

export function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}


export const onPlayPress = (ref) => {
    ref?.current?.playFromBeginning();
}