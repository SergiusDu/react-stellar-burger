import React, {useState} from "react";

export const OrderDetailsContext = React.createContext();
export default function OrderContextProvider({children}) {
    const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);
    return (
        <OrderDetailsContext.Provider value={{isOrderDetailsModalOpen, setIsOrderDetailsModalOpen}}>
            {children}
        </OrderDetailsContext.Provider>
    )
}