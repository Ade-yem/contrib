import { LayoutContext } from "@/context/layoutContext";
import { useContext, useEffect } from "react";

const PageTitle = ({ title = "Dashboard" }) => {
  const { setCurrentDashboardPageTitle } = useContext(LayoutContext);

  useEffect(
    () => setCurrentDashboardPageTitle(title),
    [setCurrentDashboardPageTitle, title]
  );

  return null;
};

export default PageTitle;
