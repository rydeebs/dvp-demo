import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Search, Inbox, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Delaware Valley Paving - Automation Dashboard",
  description: "CEO Demo: Automation layer built on HubSpot CRM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Header */}
            <header className="h-14 border-b bg-card flex items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Inbox className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Bell className="w-4 h-4" />
                </Button>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
                  C
                </div>
              </div>
            </header>
            
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-background">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
