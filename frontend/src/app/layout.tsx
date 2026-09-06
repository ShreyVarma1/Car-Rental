import AppProviders from "@/providers/app_providers";
import Header from "@/components/layout/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <Header />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}