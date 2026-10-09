"""Publishes scheduled blog articles whose time has come.

Queue: .github/scheduled-posts/schedule.json + .github/scheduled-posts/<slug>.html
For every item with publish_at <= now: moves the HTML to blog/<slug>.html (switching
robots to index,follow), adds the entry to the top of blog/posts.json and removes it
from the queue. Run by .github/workflows/publish-scheduled-posts.yml.
"""
import datetime
import json
import os

QUEUE_DIR = '.github/scheduled-posts'
SCHEDULE = os.path.join(QUEUE_DIR, 'schedule.json')
POSTS = 'blog/posts.json'

now = datetime.datetime.now(datetime.timezone.utc)
with open(SCHEDULE, encoding='utf-8') as f:
    schedule = json.load(f)

due = [i for i in schedule if datetime.datetime.fromisoformat(i['publish_at']) <= now]
if not due:
    print('Nothing to publish.')
    raise SystemExit(0)

with open(POSTS, encoding='utf-8-sig') as f:
    posts = json.load(f)
lst = posts['posts'] if isinstance(posts, dict) else posts
existing = {p.get('slug') for p in lst}

for item in due:
    slug = item['slug']
    src = os.path.join(QUEUE_DIR, slug + '.html')
    with open(src, encoding='utf-8') as f:
        page = f.read()
    page = page.replace('<meta name="robots" content="noindex,nofollow" />',
                        '<meta name="robots" content="index,follow" />')
    with open(os.path.join('blog', slug + '.html'), 'w', encoding='utf-8', newline='\n') as f:
        f.write(page)
    os.remove(src)
    if slug not in existing:
        lst.insert(0, item['post'])
    print('Published:', slug)

with open(POSTS, 'w', encoding='utf-8', newline='\n') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
    f.write('\n')

rest = [i for i in schedule if i not in due]
with open(SCHEDULE, 'w', encoding='utf-8', newline='\n') as f:
    json.dump(rest, f, ensure_ascii=False, indent=2)
    f.write('\n')
