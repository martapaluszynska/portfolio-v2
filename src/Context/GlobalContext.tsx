import React, { createContext, Dispatch, useContext, useState } from 'react';

const PageContext = createContext<any>({});
const PageActionsContext = createContext<Dispatch<any>>(() => ({}));

export const usePageContext = () => useContext(PageContext);
export const usePageActionsContext = () => useContext(PageActionsContext);

export const PageContextProvider: React.FC = ({ children }) => {
    const [pageData, setPageData] = useState<any>({
        activePage: '/',
    });

    return (
        <PageContext.Provider value={pageData}>
            <PageActionsContext.Provider value={setPageData}>
                {children}
            </PageActionsContext.Provider>
        </PageContext.Provider>
    );
};
