import { ClerkProvider, useUser } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "../components/ui/Navbar";

export const metadata = { title: "TaskGen", description: "Generate & manage tasks" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-black text-white min-h-screen">
          <Navbar />
          <main className="pt-16">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
