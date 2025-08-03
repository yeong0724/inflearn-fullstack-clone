import Providers from "@/config/providers";
import type { Props } from "@/types/app/type";
import { getAllCategories, getProfile } from "@/lib/api";
import SiteHeader from "@/components/site-header";
import "./globals.css";
import { Toaster } from "sonner";
import { auth } from "@/auth";

export default async function RootLayout({ children }: Props) {
  const [session, profile, categories] = await Promise.all([
    auth(),
    getProfile(),
    getAllCategories(),
  ]);

  return (
    <html lang="en">
      <body>
        <Providers>
          <SiteHeader
            session={session}
            profile={profile.data}
            categories={categories.data ?? []}
          />
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
