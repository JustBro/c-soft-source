import Layout from "@/components/pageComponents/layout/layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children};</Layout>;
}
