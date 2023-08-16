import React, {createContext, useContext, useState} from "react";

const IngredientContext = createContext();

export function IngredientProvider({children}) {
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  return (
    <IngredientContext.Provider value={{selectedIngredient, setSelectedIngredient}}>
      {children}
    </IngredientContext.Provider>
  )
}

export function useIngredient() {
  return useContext(IngredientContext);
}