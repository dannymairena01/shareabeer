// screens.jsx — Share a Beer screens

const { useState: uS, useEffect: uE, useRef: uR, useMemo: uM, useCallback: uC } = React;
const { PALETTES, BG_TONES, FEED, FRIENDS, TROPHIES, Icons, Avatar, BeerPhoto } = window.SAB;

// ─── Glass card primitive ────────────────────────────────────────────────────
function Glass({ children, style, radius = 22, intensity = 'med' }) {
  const blur = intensity === 'strong' ? 28 : intensity === 'light' ? 12 : 18;
  return (
    <div
      style={{
        background: 'rgba(20,18,14,0.55)',
        WebkitBackdropFilter: `blur(${blur}px) saturate(160%)`,
        backdropFilter: `blur(${blur}px) saturate(160%)`,
        border: '0.5px solid rgba(255,255,255,0.12)',
        borderRadius: radius,
        boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset, 0 12px 40px rgba(0,0,0,0.4)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Star rating ─────────────────────────────────────────────────────────────
function Stars({ value, size = 11, accent = '#F4C24A' }) {
  return (
    <div style={{ display: 'inline-flex', gap: 1.5, alignItems: 'center' }}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <div key={i} style={{ position: 'relative', width: size, height: size }}>
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              style={{ position: 'absolute', inset: 0 }}
            >
              <path
                d="M12 2 15 9l7 .5-5.5 4.6 2 7L12 17l-6.5 4.1 2-7L2 9.5 9 9z"
                fill="rgba(255,255,255,0.15)"
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                width: `${fill * 100}%`,
                overflow: 'hidden',
              }}
            >
              <svg width={size} height={size} viewBox="0 0 24 24">
                <path d="M12 2 15 9l7 .5-5.5 4.6 2 7L12 17l-6.5 4.1 2-7L2 9.5 9 9z" fill={accent} />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────
function FeedHeader({ pal }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 18px 14px',
        position: 'sticky',
        top: 0,
        zIndex: 5,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.92) 60%, rgba(0,0,0,0))',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontFamily: 'Inter' }}>
        <span
          style={{
            lineHeight: 1,
            fontStyle: 'italic',
            fontFamily: '"Instrument Serif"',
            letterSpacing: '0px',
            textAlign: 'left',
            fontSize: '18px',
            color: 'rgb(201, 122, 54)',
          }}
        >
          Share a beer
        </span>
        <span
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: 18,
            lineHeight: 1,
            color: pal.accent,
            fontStyle: 'italic',
            letterSpacing: '0.01em',
          }}
        ></span>
      </div>
      <div style={{ display: 'flex', gap: 6, color: 'rgba(255,255,255,0.85)' }}>
        <button className="ico-btn">{Icons.search}</button>
        <button className="ico-btn">{Icons.bell}</button>
      </div>
    </div>
  );
}

// ─── Tab strip ───────────────────────────────────────────────────────────────
function FeedTabs({ tab, setTab, pal }) {
  const tabs = ['For you', 'Following', 'Nearby'];
  return (
    <div
      style={{
        display: 'flex',
        gap: 22,
        padding: '0 18px 14px',
        borderBottom: '0.5px solid rgba(255,255,255,0.06)',
      }}
    >
      {tabs.map((t) => {
        const active = t === tab;
        return (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              background: 'none',
              border: 0,
              padding: '6px 0',
              position: 'relative',
              color: active ? '#fff' : 'rgba(255,255,255,0.45)',
              fontSize: 13.5,
              fontWeight: active ? 600 : 500,
              letterSpacing: '0.01em',
            }}
          >
            {t}
            {active && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: -14,
                  height: 2,
                  background: pal.accent,
                  borderRadius: 2,
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Beer detail card (used in feed) ─────────────────────────────────────────
function BeerDetailCard({ beer, pal, compact }) {
  return (
    <Glass radius={18} style={{ padding: compact ? '10px 12px' : '12px 14px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 10,
        }}
      >
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              color: '#fff',
              fontSize: compact ? 14 : 15.5,
              fontWeight: 600,
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {beer.name}
          </div>
          <div
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: 11.5,
              marginTop: 2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {beer.brewery} · {beer.style}
          </div>
        </div>
        <div
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '0.5px solid rgba(255,255,255,0.1)',
            borderRadius: 10,
            padding: '4px 8px',
            textAlign: 'center',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              color: pal.accent,
              fontWeight: 700,
              fontSize: 13,
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {beer.abv.toFixed(1)}
          </div>
          <div
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 8.5,
              fontWeight: 600,
              letterSpacing: '0.08em',
              marginTop: 2,
            }}
          >
            ABV%
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
        <Stars value={beer.rating} size={10} accent={pal.accent} />
        <span
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 11,
            fontWeight: 600,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {beer.rating.toFixed(1)}
        </span>
        <span
          style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: 10.5,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          · {beer.ratings.toLocaleString()} ratings
        </span>
      </div>
    </Glass>
  );
}

// ─── Post action row ─────────────────────────────────────────────────────────
function ActionRow({ post, pal, onLike }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        padding: '12px 18px 4px',
        color: 'rgba(255,255,255,0.85)',
      }}
    >
      <button
        onClick={onLike}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'none',
          border: 0,
          color: post.liked ? pal.accent : 'rgba(255,255,255,0.85)',
          padding: 0,
          transition: 'color 0.2s, transform 0.15s',
          transform: post.liked ? 'scale(1.0)' : 'scale(1)',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            transform: post.liked ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill={post.liked ? pal.accent : 'none'}
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
          </svg>
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
          {post.likes}
        </span>
      </button>
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'none',
          border: 0,
          color: 'inherit',
          padding: 0,
        }}
      >
        {Icons.comment}
        <span style={{ fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
          {post.comments}
        </span>
      </button>
      <button
        style={{ background: 'none', border: 0, color: 'inherit', padding: 0, marginLeft: 'auto' }}
      >
        {Icons.share}
      </button>
    </div>
  );
}

// ─── Photo post ──────────────────────────────────────────────────────────────
function PhotoPost({ post, pal, density, onLike }) {
  const h = density === 'compact' ? 360 : density === 'comfy' ? 460 : 410;
  return (
    <article style={{ marginBottom: density === 'compact' ? 18 : 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 18px 12px' }}>
        <Avatar user={post.user} ring={pal.accent} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: '#fff', fontSize: 13.5, fontWeight: 600 }}>{post.user.name}</div>
          <div
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 11.5,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {post.where} · {post.when}
          </div>
        </div>
        <button style={{ background: 'none', border: 0, color: 'rgba(255,255,255,0.5)' }}>
          {Icons.more}
        </button>
      </div>

      <div style={{ position: 'relative', margin: '0 14px', borderRadius: 22, overflow: 'hidden' }}>
        <BeerPhoto kind={post.photo} height={h} rounded={22}>
          <div style={{ position: 'absolute', left: 12, right: 12, bottom: 12 }}>
            <BeerDetailCard beer={post.beer} pal={pal} />
          </div>
        </BeerPhoto>
      </div>

      <ActionRow post={post} pal={pal} onLike={onLike} />
    </article>
  );
}

// ─── Check-in (text) post ────────────────────────────────────────────────────
function CheckinPost({ post, pal, onLike }) {
  return (
    <article
      style={{
        marginBottom: 24,
        margin: '0 14px 24px',
        padding: '14px 16px 4px',
        background: 'rgba(255,255,255,0.025)',
        border: '0.5px solid rgba(255,255,255,0.07)',
        borderRadius: 22,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <Avatar user={post.user} size={32} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{post.user.name}</div>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>
            checked in · {post.when}
          </div>
        </div>
        <div
          style={{
            background: pal.accent,
            color: '#000',
            borderRadius: 999,
            padding: '3px 9px',
            fontSize: 11,
            fontWeight: 700,
            fontVariantNumeric: 'tabular-nums',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2 15 9l7 .5-5.5 4.6 2 7L12 17l-6.5 4.1 2-7L2 9.5 9 9z" />
          </svg>
          {post.beer.score.toFixed(1)}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
        {/* Mini beer glass */}
        <div style={{ width: 44, height: 56, flexShrink: 0, position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              inset: '4px 6px 0 6px',
              borderRadius: '4px 4px 8px 8px',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 8%, #F2C95A 12%, #B07A14 100%)',
              border: '0.5px solid rgba(255,255,255,0.15)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 8,
              right: 8,
              top: 6,
              height: 8,
              background: 'rgba(255,255,255,0.5)',
              borderRadius: 4,
              filter: 'blur(2px)',
            }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: '#fff', fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>
            {post.beer.name}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, marginTop: 1 }}>
            {post.beer.brewery} · {post.beer.style} · {post.beer.abv}% ABV
          </div>
          <div
            style={{
              color: pal.cream,
              fontSize: 13,
              marginTop: 8,
              lineHeight: 1.4,
              fontStyle: 'italic',
              textWrap: 'pretty',
            }}
          >
            "{post.note}"
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 6 }}>
            at {post.where}
          </div>
        </div>
      </div>
      <ActionRow post={post} pal={pal} onLike={onLike} />
    </article>
  );
}

// ─── Session post (recap card) ───────────────────────────────────────────────
function SessionPost({ post, pal, onLike }) {
  return (
    <article style={{ margin: '0 14px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 4px 12px' }}>
        <Avatar user={post.user} />
        <div style={{ flex: 1 }}>
          <div style={{ color: '#fff', fontSize: 13.5, fontWeight: 600 }}>{post.user.name}</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11.5 }}>
            ended a session · {post.when}
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'relative',
          borderRadius: 24,
          padding: 20,
          overflow: 'hidden',
          background: `radial-gradient(140% 100% at 0% 0%, ${pal.accent}22 0%, transparent 50%),
                     linear-gradient(180deg, #1A1610 0%, #0A0806 100%)`,
          border: '0.5px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 18,
          }}
        >
          <div>
            <div
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: 10.5,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Session
            </div>
            <div
              style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: '-0.01em',
                marginTop: 2,
              }}
            >
              {post.where}
            </div>
          </div>
          <div style={{ color: pal.accent }}>{Icons.flag}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10 }}>
          {[
            { v: post.session.duration, l: 'Time' },
            { v: post.session.beers, l: 'Beers' },
            { v: post.session.friends, l: 'Friends' },
            { v: post.session.miles, l: 'Miles' },
          ].map((s, i) => (
            <div key={i}>
              <div
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 600,
                  fontFamily: '"Instrument Serif", serif',
                  fontStyle: 'italic',
                  letterSpacing: '-0.01em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {s.v}
              </div>
              <div
                style={{
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginTop: 2,
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ActionRow post={post} pal={pal} onLike={onLike} />
    </article>
  );
}

// ─── Feed screen ─────────────────────────────────────────────────────────────
function Feed({ pal, density }) {
  const [tab, setTab] = uS('For you');
  const [feed, setFeed] = uS(FEED);
  const toggleLike = (id) =>
    setFeed((f) =>
      f.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p,
      ),
    );
  return (
    <>
      <FeedHeader pal={pal} />
      <FeedTabs tab={tab} setTab={setTab} pal={pal} />
      <div style={{ paddingTop: 16, paddingBottom: 24 }}>
        {feed.map((p) => {
          if (p.kind === 'photo')
            return (
              <PhotoPost
                key={p.id}
                post={p}
                pal={pal}
                density={density}
                onLike={() => toggleLike(p.id)}
              />
            );
          if (p.kind === 'checkin')
            return <CheckinPost key={p.id} post={p} pal={pal} onLike={() => toggleLike(p.id)} />;
          if (p.kind === 'session')
            return <SessionPost key={p.id} post={p} pal={pal} onLike={() => toggleLike(p.id)} />;
          return null;
        })}
        <div
          style={{
            textAlign: 'center',
            color: 'rgba(255,255,255,0.3)',
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '14px 0 6px',
          }}
        >
          ── you're caught up ──
        </div>
      </div>
    </>
  );
}

window.SAB.Screens = { Feed };
