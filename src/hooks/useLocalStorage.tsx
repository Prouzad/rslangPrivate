import { useState, useEffect } from "react";

export function useLocalStorage(initialValue:  any, key: any) {
  const getValue = () => {
    const storage = localStorage.getItem(key);
    if (storage) {
      JSON.parse(storage);
    }
    return initialValue;
  };

  const [value, setValue] = useState(getValue); //должно вычисляться, так ка зависит от того, сть ли в стораже данные. Если есть, то берем их, если нет, то пустой массив
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}


//(initialValue:  string[], key: string)