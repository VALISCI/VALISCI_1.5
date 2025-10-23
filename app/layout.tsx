- export default function RootLayout({ children }: { children: React.ReactNode }) {
+ import Header from "./Header";
+ export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
     <html lang="en">
       <body>
-        {/* header lived in page.tsx before */}
+        <Header />
         {children}
       </body>
     </html>
   );
 }
