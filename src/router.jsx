import {createBrowserRouter} from "react-router-dom"
import Layout from "./Component/Layout/Layout"
import Home from "./pages/Home"
import About from "./pages/About"
import Grand from "./pages/Grand"
import Standart from "./pages/Standart"

const myRouter = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "about",
                element: <About/>
            },
            {
                path: "grand",
                element: <Grand/>
            },
            {
                path: "standart",
                element: <Standart/>
            }
        ]
    }
])

export default myRouter