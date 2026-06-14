import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "@/components/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppBackgroundWrapper from "@/components/AppBackgroundWrapper";

export const metadata = {
  title: "Qwizzy Platform Engine",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>
            {/* This sub-component safely reads the theme states from below the provider layer */}
            <AppBackgroundWrapper>{children}</AppBackgroundWrapper>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
