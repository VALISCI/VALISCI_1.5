+// app/Header.tsx
+import Image from "next/image";
+export default function Header() {
+  return (
+    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-black/5">
+      <div className="mx-auto max-w-[1200px] px-6 py-2 lg:py-1 flex items-center justify-between">
+        {/* Brand */}
+        <div className="flex items-center gap-3">
+          <Image
+            src="/assets/valisci_logo.svg"
+            alt="VALISCI"
+            width={768}
+            height={192}
+            priority
+            className="h-16 md:h-24 lg:h-48 w-auto"
+          />
+        </div>
+
+        {/* Primary nav */}
+        <nav className="hidden md:flex items-center gap-6 lg:gap-8 leading-none">
+          <a className="opacity-90 hover:opacity-100" href="#doctrine">Doctrine</a>
+          <a className="opacity-90 hover:opacity-100" href="#ethos">Ethos</a>
+          <a className="opacity-90 hover:opacity-100" href="#systems">Systems</a>
+          <a className="opacity-90 hover:opacity-100" href="#industries">Industries</a>
+          <a className="opacity-90 hover:opacity-100" href="#brief">Brief</a>
+          <a className="opacity-90 hover:opacity-100" href="#contact">Contact</a>
+        </nav>
+
+        {/* CTA / Mobile */}
+        <div className="flex items-center gap-3">
+          <a className="inline-flex items-center rounded-2xl px-4 py-2.5 shadow-sm bg-cyan-500 text-white">
+            Initiate
+          </a>
+          <button className="md:hidden p-2 rounded-lg focus:outline-none focus:ring">☰</button>
+        </div>
+      </div>
+    </header>
+  );
+}
