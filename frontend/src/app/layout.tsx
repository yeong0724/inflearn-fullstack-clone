import Providers from "@/config/providers";
import type { Props } from "@/types/app/type";
import { getAllCategories, getProfile } from "@/lib/api";
import SiteHeader from "@/components/site-header";
import "./globals.css";
import { Toaster } from "sonner";

export default async function RootLayout({ children }: Props) {
  const { data: profile } = await getProfile();
  const categories = await getAllCategories();

  return (
    <html lang="en">
      <body>
        <Providers>
          <SiteHeader profile={profile} categories={categories.data ?? []} />
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
