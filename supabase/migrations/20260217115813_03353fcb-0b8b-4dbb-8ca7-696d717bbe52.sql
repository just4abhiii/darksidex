
-- Create storage bucket for reel videos
INSERT INTO storage.buckets (id, name, public) VALUES ('reel-videos', 'reel-videos', true);

-- Allow anyone to read videos (public)
CREATE POLICY "Public read access for reel videos"
ON storage.objects FOR SELECT
USING (bucket_id = 'reel-videos');

-- Allow anyone to upload videos (no auth in this app)
CREATE POLICY "Public upload access for reel videos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'reel-videos');

-- Allow anyone to update videos
CREATE POLICY "Public update access for reel videos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'reel-videos');

-- Allow anyone to delete videos
CREATE POLICY "Public delete access for reel videos"
ON storage.objects FOR DELETE
USING (bucket_id = 'reel-videos');
