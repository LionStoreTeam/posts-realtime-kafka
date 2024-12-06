export { default } from "next-auth/middleware";

// Configuración de las rutas protegidas
export const config = {
  matcher: ["/new/:path*", "/posts/:path*", "/profile/:path*"],
};
