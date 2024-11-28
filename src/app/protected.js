import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProtectedPage() {
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const session = await getSession();
      if (!session) {
        router.push('/page');
      }
    }
    checkSession();
  }, [router]);

  return (
    <div>
      <h1>Página protegida</h1>
      {/* Contenido de la página */}
    </div>
  );
}
