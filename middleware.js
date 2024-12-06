export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const isProtected = ['/pages/admin', '/pages/entrenador', '/pages/alumnos'].some((route) =>
    req.nextUrl.pathname.startsWith(route)
    );

    if (isProtected && !token) {
    return NextResponse.redirect(new URL('/', req.url));
    }

    // Redirigir según el rol
    if (token) {
    const role = token.role;

    if (req.nextUrl.pathname.startsWith('/pages/admin') && role !== 'admin') {
        return NextResponse.redirect(new URL('/403', req.url)); // Página de error 403
    }if (req.nextUrl.pathname.startsWith('/pages/admin/alumnos') && role !== 'admin') {
        return NextResponse.redirect(new URL('/403', req.url)); // Página de error 403
    }
    if (req.nextUrl.pathname.startsWith('/pages/entrenador') && role !== 'trainer') {
        return NextResponse.redirect(new URL('/403', req.url));
    }
    if (req.nextUrl.pathname.startsWith('/pages/alumnos') && role !== 'student') {
        return NextResponse.redirect(new URL('/403', req.url));
    }
    }

    return NextResponse.next();
}
