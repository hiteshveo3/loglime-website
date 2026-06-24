import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = new Set(["/login", "/signup", "/forgot-password", "/reset-password", "/accept-invite"]);
const CRM_ROLES = new Set(["owner", "admin", "sales", "support", "developer", "designer"]);

function redirect(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url);
}

export async function updateSession(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options) {
        request.cookies.set({ name, value, ...options });
        response = NextResponse.next({ request });
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options) {
        request.cookies.set({ name, value: "", ...options });
        response = NextResponse.next({ request });
        response.cookies.set({ name, value: "", ...options });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAuthRoute = AUTH_ROUTES.has(pathname);

  if (!user) {
    if (isAuthRoute) {
      return response;
    }

    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  const role = profile?.role;

  if (role === "customer") {
    if (isAuthRoute || pathname === "/" || pathname.startsWith("/crm")) {
      return redirect(request, "/portal/dashboard");
    }
  } else if (typeof role === "string" && CRM_ROLES.has(role)) {
    if (isAuthRoute || pathname === "/" || pathname.startsWith("/portal")) {
      return redirect(request, "/crm/dashboard");
    }
  } else if (!isAuthRoute) {
    return redirect(request, "/login");
  }

  return response;
}
