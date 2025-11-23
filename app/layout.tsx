export const metadata = {
  title: 'SirenCY API',
  description: 'API Service for SirenCY',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

