import React, { createContext, useContext, useState } from 'react';

const PageContext = createContext<any>({})
const PageActionsContext = createContext<Function>(() => {})


export const usePageContext = () => useContext(PageContext);
export const usePageActionsContext = () => useContext(PageActionsContext);

export const PageContextProvider: React.FC = ({ children }) => {
    const [pageData, setPageData] = useState<any>({
        activePage: '/'
    });

    return (
        <PageContext.Provider value={pageData}>
            <PageActionsContext.Provider value={setPageData}>
                {children}
            </PageActionsContext.Provider>
        </PageContext.Provider>
    )
}
