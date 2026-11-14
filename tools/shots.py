"""README screenshots: python3 tools/shots.py (needs Playwright + Chromium, run node build.mjs first)."""
import os
from playwright.sync_api import sync_playwright
D=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))+'/'
os.makedirs(D+'screenshots',exist_ok=True)
P=(390,844); L=(844,390); T=(820,1180)
S=[('grain',P,'grain',''),('tone',P,'tone',''),('mod',P,'mod',''),('play',P,'play',''),('seq',P,'seq',''),
   ('sample',P,'sample',''),('edit',P,'sample',"document.querySelector('#edCard').scrollIntoView()"),
   ('tutorial',P,'grain',"document.querySelector('#menuBtn').click();document.querySelector('#tourBtn').click()"),('menu',P,'grain',"document.querySelector('#menuBtn').click()"),
   ('tablet',T,'grain',''),
   ('landscape',L,'grain',''),('landscape-play',L,'play',''),('landscape-mod',L,'mod',''),('landscape-seq',L,'seq',''),('landscape-edit',L,'sample',"document.querySelector('#edCard').scrollIntoView()")]
with sync_playwright() as p:
    b=p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
    for name,(w,h),tab,js in S:
        c=b.new_context(viewport={'width':w,'height':h},device_scale_factor=2,has_touch=True,is_mobile=True)
        pg=c.new_page(); pg.add_init_script("localStorage.setItem('grains.tour','1');localStorage.setItem('grains.cfg.v1',JSON.stringify({tips:'off',ui:'full'}))"); pg.goto('file://'+D+'index.html'); pg.wait_for_timeout(600)
        try: pg.locator('#startBtn').click(timeout=1500)
        except Exception: pg.mouse.click(w//2,h//2)
        pg.wait_for_timeout(1800)
        for sel in ['#tourSkip','text=SKIP']:
            try: pg.locator(sel).first.click(timeout=300)
            except Exception: pass
        pg.locator(f'#tabs button[data-t="{tab}"]').first.click(); pg.wait_for_timeout(400)
        if js: pg.evaluate(js); pg.wait_for_timeout(700)
        pg.screenshot(path=D+'screenshots/'+name+'.png'); c.close()
    b.close()
