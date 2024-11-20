import { ReactNode } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme";
import NavigationBar from "@/components/utils/Navbar";
import { AuthProvider } from "@/components/providers/auth";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <NavigationBar />
            <div id="content">{children}</div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
