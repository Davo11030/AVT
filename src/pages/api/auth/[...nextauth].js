import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

// Crear cliente de Supabase
const createSupabaseClient = () => {
  const cookieStore = cookies();
  return createServerComponentClient({
    cookies: () => cookieStore,
  });
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      authorize: async (credentials) => {
        const supabase = createSupabaseClient(); // Instancia de Supabase
        const { username, password } = credentials;

        // Buscar el usuario en la tabla 'alumnos'
        let { data: user, error } = await supabase
          .from("alumnos")
          .select("*")
          .eq("usuario", username)
          .single();

        if (!user) {
          // Si no se encuentra en 'alumnos', buscar en la tabla 'entrenadores'
          ({ data: user, error } = await supabase
            .from("entrenadores")
            .select("*")
            .eq("usuario", username)
            .single());
        }

        if (error || !user) {
          // Si no se encontró el usuario en ambas tablas
          return null;
        }

        // Verificar la contraseña
        const isPasswordValid = user.contraseña === password;
        if (!isPasswordValid) {
          return null; // Contraseña incorrecta
        }

        // Determinar el rol basado en la tabla de origen y el idrol
        const role =
          user.idrol === 1
            ? "student"
            : user.idrol === 2
            ? "admin"
            : "trainer";

        return {
          id: user.idalumno || user.identrenador, // Usar el ID correspondiente
          name: user.nombre,
          role,
        };
      },
    }),
  ],
  secret: 'faf3d0dbe30262e1873706a79093fd3b7d302c43d5e89abad8c88a41a2a201f6', // Usa una variable de entorno para el secreto
  session: {
    strategy: "jwt",
    maxAge: 15 * 60, // 15 minutos de sesión
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Guardar el ID, nombre y rol del usuario en el token
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Pasar la información del token a la sesión
      session.id = token.id;
      session.name = token.name;
      session.role = token.role;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirigir basado en el rol del usuario
      const role = url.role;
      if (role === "admin") {
        return `${baseUrl}/admin`;
      } else if (role === "trainer") {
        return `${baseUrl}/trainer-dashboard`;
      } else if (role === "student") {
        return `${baseUrl}/student-dashboard`;
      }
      return baseUrl;
    },
  },
});
