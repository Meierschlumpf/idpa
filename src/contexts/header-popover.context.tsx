import { createContext, ReactNode, useContext } from "react";

const HeaderPopoverContext = createContext({
	closePopover: () => { }
});

interface HeaderPopoverProviderProps {
	children: ReactNode;
	closePopover: () => void;
}

export const HeaderPopoverProvider = ({ children, closePopover }: HeaderPopoverProviderProps) => {
	return <HeaderPopoverContext.Provider value={{ closePopover }}>
		{children}
	</HeaderPopoverContext.Provider>
}

export const useHeaderPopoverContext = () => {
	return useContext(HeaderPopoverContext);
}