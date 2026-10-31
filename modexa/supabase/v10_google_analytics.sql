-- Modexa v10: Google Analytics settings (run once in Supabase SQL editor)
alter table public.site_settings add column if not exists ga_measurement_id text not null default 'G-D6TLV9Y2L7';
alter table public.site_settings add column if not exists ga_enabled boolean not null default true;
alter table public.site_settings add column if not exists ga_require_consent boolean not null default false;
alter table public.site_settings drop constraint if exists site_settings_ga_len;
alter table public.site_settings add constraint site_settings_ga_len check (char_length(ga_measurement_id) <= 40);
