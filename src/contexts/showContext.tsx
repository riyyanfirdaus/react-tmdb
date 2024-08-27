import { createContext, useState } from "react";

export type ShowContextType = {
  isShow: boolean;
  handleShow: () => void;
};

export const ShowContext = createContext<ShowContextType | null>(null);

const ShowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isShow, setIsShow] = useState<boolean>(true);

  const handleShow = () => {
    setIsShow((prev) => !prev);
  };

  return <ShowContext.Provider value={{ isShow, handleShow }}>{children}</ShowContext.Provider>;
};

export default ShowProvider;
