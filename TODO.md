# Performance Optimization Plan for Karate Site

## Tasks to Complete
- [x] Reduce particles count in particles.js config to improve CPU performance
- [x] Implement lazy loading for videos in kumite modal to prevent loading all videos at once
- [x] Add loading placeholders/indicators for videos
- [ ] Optimize script loading and defer heavy animations if needed
- [ ] Test the site performance after changes

## Information Gathered
- Site uses particles.js with 120 particles causing high CPU usage
- Videos (9 total) are loaded simultaneously in modal causing slow loading
- No lazy loading or optimization for video playback

## Plan Details
1. **Particles Optimization**: Reduce particle count from 120 to 50-60 for better performance
2. **Video Lazy Loading**: Use Intersection Observer API to load video src only when video element is visible in viewport
3. **Loading UI**: Add skeleton loaders or spinners for videos while loading
4. **Script Deferral**: Move non-critical scripts to load after page load

## Dependent Files
- script.js: Particles config and video loading logic
- index.html: Script loading order
- style.css: Loading placeholder styles (if needed)
