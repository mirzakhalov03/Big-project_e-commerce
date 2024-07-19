import { Suspense } from "react"
import Loading from "./Loading"

const SuspenseController = ({children}) => {
    return <Suspense fallback={<Loading/>} >
        {children}
    </Suspense>

}

export default SuspenseController
