const SESSION_KEY = "ig_analytics_session";

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

let currentPath = "";
let pageEnteredAt = 0;

export function trackPageView(path: string) {
  // Mock tracking for now since Supabase is not configured
  console.log("[Analytics] Page view:", path);
  currentPath = path;
  pageEnteredAt = Date.now();
}

export function trackEvent(eventType: string, eventData: Record<string, unknown> = {}) {
  // Mock tracking for now
  console.log("[Analytics] Event:", eventType, eventData);
}
