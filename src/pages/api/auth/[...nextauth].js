import { supabase } from '@/lib/supabase'; // Ruta del cliente de Supabase
import { compare } from 'bcryptjs'; // En lugar de 'bcrypt'
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Usuario', type: 'text' },
        password: { label: 'Contraseña', type: 'password' },
      },
      authorize: async (credentials) => {
        const { username, password } = credentials;

        // Buscar el usuario en la tabla 'alumnos'
        let { data, error } = await supabase
          .from('alumnos')
          .select('*')
          .eq('usuario', username)
          .single();

        if (!data) {
          // Si no se encuentra en 'alumnos', buscar en la tabla 'entrenadores'
          ({ data, error } = await supabase
            .from('entrenadores')
            .select('*')
            .eq('usuario', username)
            .single());
        }

        if (error || !data) {
          // Si no se encontró el usuario en ambas tablas
          return null;
        }

        // Verificar la contraseña
        const isPasswordValid = await compare(data.contraseña, password);
        if (isPasswordValid) {
          // Determinar el rol basado en la tabla de origen y el idrol
          let role = 'trainer'; // Valor por defecto
          if (data.idrol === 1) {
            role = 'student';
          } else if (data.idrol === 2) {
            role = 'admin';
          }

          return {
            id: data.idalumno || data.identrenador, // Usa el id correspondiente de la tabla encontrada
            name: data.nombre,
            role,
          };
        } else {
          return null; // Contraseña incorrecta
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
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
    async redirect({ url, baseUrl, session }) {
      if (session) {
        if (session.role === 'admin') {
          return baseUrl + '/admin';
        } else if (session.role === 'trainer') {
          return baseUrl + '/trainer-dashboard';
        } else if (session.role === 'student') {
          return baseUrl + '/student-dashboard';
        }
      }
      return baseUrl;
    },
  },
});
