export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main className="text-white-1">
        {children}
      </main>
    </div>
  );
}
