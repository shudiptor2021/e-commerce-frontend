import { fetchUserProfile } from "@/lib/auth";
import { Toaster } from "sonner";
import BreadCrumbs from "../_components/BreadCrumbs";
import Footer from "../_components/Footer";
import Navbar from "../_components/Navbar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await fetchUserProfile();
  // const cookieStore = await cookies();
  // const userId = cookieStore.get("userId")?.value;

  // const token = cookieStore.get("token")?.value;
  // console.log(userData?.role);
  // console.log(token);
  // console.log(userData);
  return (
    <div>
      <Navbar userData={userData} />
      <BreadCrumbs />
      {/* <SearchModal /> */}
      {children}
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
}
