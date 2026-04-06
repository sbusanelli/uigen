import { NextRequest, NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

// Rate limiter for API routes
const rateLimiter = new RateLimiterMemory({
  keyGenerator: (req: NextRequest) => req.ip || "anonymous",
  points: 10, // Number of requests
  duration: 60, // Per 60 seconds
});

// Security headers
const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

export async function securityMiddleware(req: NextRequest) {
  // Apply rate limiting
  try {
    await rateLimiter.consume(req.ip || "anonymous");
  } catch (rejRes: any) {
    return NextResponse.json(
      { error: "Too many requests" },
      { 
        status: 429,
        headers: {
          "Retry-After": rejRes.msBeforeNext ? Math.ceil(rejRes.msBeforeNext / 1000).toString() : "60",
          ...securityHeaders,
        }
      }
    );
  }

  // Apply security headers to response
  const response = NextResponse.next();
  
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}
