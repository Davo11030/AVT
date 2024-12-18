import { createClient } from '@/utils/supabase/server';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      
      authorize: async (credentials) => {
      
        const supabase = await createClient();
        const { username, password } = credentials;
      
        // Buscar en la tabla 'alumnos'
        let { data: user, error } = await supabase
          .from("alumnos")
          .select("*")
          .eq("usuario", username)
          .single();

        if (!user) {
          // Buscar en la tabla 'entrenadores' si no está en 'alumnos'
          ({ data: user, error } = await supabase
            .from("entrenadores")
            .select("*")
            .eq("usuario", username)
            .single());
        }

        if (error || !user) {
          console.error("Usuario no encontrado o error en la consulta:", error);
          return null;
        }

        // Verificar la contraseña (sin hash, solo comparación directa)
        const isPasswordValid = user.contraseña === password;
        if (!isPasswordValid) {
          console.error("Contraseña incorrecta");
          return null;
        }

        console.log("Usuario autenticado:", user);

        // Determinar el rol basado en la tabla y el idrol
        let role = "trainer"
        if (user.idrol === 1) {
          role = "student";
        } else if (user.idrol === 2) {
          role = "admin";
        }

        return {
          id: user.idalumno || user.identrenador,
          name: user.nombre,
          role: role
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Usa una variable de entorno para el secreto
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
      // console.log("imprimiendo session:", session)
      return session;
    },
    
  }
});
