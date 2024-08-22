import "./globals.css";
import { LayoutWrapper } from "@/components/layouts/LayoutWrapper";

import { FC, ReactNode } from "react";

interface IRootLayout {
  children: ReactNode;
}
const rootLayout: FC<IRootLayout> = ({ children }) => {
  return (
    <html lang="en" dir="rtl">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
};
export default rootLayout;
