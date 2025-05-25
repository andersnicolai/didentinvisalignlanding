import { NavbarPage } from "@/components/NavbarPage";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarPage />
      {children}
    </>
  );
}
