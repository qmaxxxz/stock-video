STOCK VIDEO NEW5

Scene baru:
1. smartcity
2. neural
3. finance
4. renewables
5. cosmos

Render tetap berjalan di GitHub Actions.
Resolusi default render.js: 3840x2160, 30 FPS, H.264.
Jalankan dari Termux:
gh workflow run render.yml --ref main -f scene=new5 -f seconds=20 -f fps=30 -f preview=false
