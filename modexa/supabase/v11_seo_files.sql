-- Modexa v11: editable robots.txt and sitemap.xml (run once in Supabase SQL editor)
alter table public.site_settings add column if not exists robots_txt text not null default '';
alter table public.site_settings add column if not exists sitemap_xml text not null default '';
alter table public.site_settings drop constraint if exists site_settings_robots_len;
alter table public.site_settings add constraint site_settings_robots_len check (char_length(robots_txt) <= 512000);
alter table public.site_settings drop constraint if exists site_settings_sitemap_len;
alter table public.site_settings add constraint site_settings_sitemap_len check (char_length(sitemap_xml) <= 512000);
