import {memo} from 'react'
import {CFooter} from '@coreui/react'
import {App} from "../../../const/App";

const AppFooter = () => {
    return (
        <CFooter>
            <div>
                <span className="mr-1">&copy; 2023</span>
                <a target="_blank" rel="noopener noreferrer">
                    ATL Admin
                </a>
                <span className="ml-1">- Version {App.Version}</span>
            </div>
            <div className="ms-auto">
                <span className="me-1">Powered by</span>
                <a href="https://iig.vn" target="_blank" rel="noopener noreferrer">
                    I&I Group
                </a>
            </div>
        </CFooter>
    )
}

export default memo(AppFooter)
