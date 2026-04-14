import { BASE_URL } from "../../shared/constants"
import { useRoute } from "../../shared/hooks/useRoute"

export const getCurrentPath = () => {
    const pathname = window.location.pathname

    return pathname.startsWith(BASE_URL)
        ? pathname.slice(BASE_URL.length - 1) || '/'
        : pathname
}

const Router = (props) => {
    const { routes } = props
    const path = useRoute()

    if (path.startsWith('/tasks/')) {
        const id = path.replace('/tasks/', '')
        const TaskPage = routes['/tasks/:id']

        return <TaskPage params={{ id }}/>
    }

    const Page = routes[path] ?? routes['*']

    return <Page />

}

export default Router