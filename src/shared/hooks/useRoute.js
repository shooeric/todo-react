import { useEffect, useState } from "react"
import { getCurrentPath } from "../../app/routing/Router"

export const useRoute = () => {
    const [path, setPath] = useState(getCurrentPath)

    useEffect(() => {
        const onLocationChange = () => {
            setPath(getCurrentPath);
        }

        window.addEventListener('popstate', onLocationChange)

        return () => {
            window.removeEventListener("popstate", onLocationChange);
        }
    }, [])

    return path
}
