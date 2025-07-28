import Providers from "@/config/providers";
import type { Props } from "@/types/app/type";
import { getAllCategories } from "@/lib/api";
import SiteHeader from "@/components/site-header";
import "./globals.css";
import { Toaster } from "sonner";

export default async function RootLayout({ children }: Props) {
  const categories = await getAllCategories();

  return (
    <html lang="en">
      <body>
        <Providers>
          <SiteHeader categories={categories.data ?? []} />
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
