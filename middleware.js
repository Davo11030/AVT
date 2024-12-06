import { withAuth } from "next-auth/middleware";

export default withAuth({
pages: {
    signIn: "/403", // Página a la que redirige si no está autenticado
},
});

export const config = {
matcher: [
    // Define las rutas que deseas proteger
    "/pages/admin/:path*",
    "/pages/entrenador/:path*",
    "/pages/alumnos/:path*",
],
};
