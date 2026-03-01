
-- Analytics page views
CREATE TABLE public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  duration_ms INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (tracking doesn't require auth)
CREATE POLICY "Anyone can insert page views"
ON public.page_views FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can read page views"
ON public.page_views FOR SELECT
USING (true);

-- Analytics events (clicks, interactions)
CREATE TABLE public.analytics_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  page_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert events"
ON public.analytics_events FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can read events"
ON public.analytics_events FOR SELECT
USING (true);

-- Session recordings metadata
CREATE TABLE public.session_recordings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  duration_ms INTEGER DEFAULT 0,
  page_count INTEGER DEFAULT 0,
  events JSONB DEFAULT '[]',
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.session_recordings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert recordings"
ON public.session_recordings FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can read recordings"
ON public.session_recordings FOR SELECT
USING (true);

CREATE POLICY "Anyone can update recordings"
ON public.session_recordings FOR UPDATE
USING (true);

-- Indexes
CREATE INDEX idx_page_views_created ON public.page_views(created_at DESC);
CREATE INDEX idx_page_views_session ON public.page_views(session_id);
CREATE INDEX idx_events_type ON public.analytics_events(event_type);
CREATE INDEX idx_events_created ON public.analytics_events(created_at DESC);
CREATE INDEX idx_recordings_session ON public.session_recordings(session_id);
