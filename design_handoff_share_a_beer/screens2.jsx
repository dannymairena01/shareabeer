// screens2.jsx — Camera, Session, Profile

const { useState: u2S, useEffect: u2E, useRef: u2R } = React;
const { PALETTES, BG_TONES, FRIENDS, TROPHIES, Icons, Avatar } = window.SAB;

// ─── Camera screen ───────────────────────────────────────────────────────────
function Camera({ pal, onConfirm, onClose }) {
  const videoRef = u2R(null);
  const [cameraOk, setCameraOk] = u2S(null); // null=loading, true=ok, false=denied
  const [scanning, setScanning] = u2S(true);
  const [matched, setMatched] = u2S(false);

  u2E(() => {
    let stream;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 } },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraOk(true);
        }
      } catch (e) {
        setCameraOk(false);
      }
    })();
    // simulate label match
    const t = setTimeout(() => {
      setScanning(false);
      setMatched(true);
    }, 2400);
    return () => {
      clearTimeout(t);
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#000', overflow: 'hidden' }}>
      {/* Live video or fallback */}
      {cameraOk !== false ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: matched ? 'blur(8px) brightness(0.5)' : 'brightness(0.85)',
            transition: 'filter 0.5s',
          }}
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(80% 50% at 50% 30%, ${pal.accent}33 0%, transparent 60%),
                       linear-gradient(180deg, #1a1410 0%, #000 100%)`,
            filter: matched ? 'blur(8px) brightness(0.6)' : 'none',
            transition: 'filter 0.5s',
          }}
        />
      )}

      {/* Top bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.5), transparent)',
          zIndex: 3,
        }}
      >
        <button
          onClick={onClose}
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            background: 'rgba(0,0,0,0.4)',
            border: '0.5px solid rgba(255,255,255,0.15)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {Icons.close}
        </button>
        <div style={{ display: 'flex', gap: 6 }}>
          {['Beer', 'Tap list', 'Menu'].map((m, i) => (
            <div
              key={m}
              style={{
                padding: '6px 12px',
                borderRadius: 999,
                fontSize: 11.5,
                fontWeight: 600,
                letterSpacing: '0.02em',
                background: i === 0 ? pal.accent : 'rgba(0,0,0,0.4)',
                color: i === 0 ? '#000' : 'rgba(255,255,255,0.85)',
                border: i === 0 ? 'none' : '0.5px solid rgba(255,255,255,0.15)',
              }}
            >
              {m}
            </div>
          ))}
        </div>
        <button
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            background: 'rgba(0,0,0,0.4)',
            border: '0.5px solid rgba(255,255,255,0.15)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {Icons.flash}
        </button>
      </div>

      {/* Reticle / framing guide */}
      {!matched && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -52%)',
            width: 240,
            height: 320,
            zIndex: 2,
          }}
        >
          {/* Corner brackets */}
          {[
            [0, 0, 1, 1],
            [1, 0, -1, 1],
            [0, 1, 1, -1],
            [1, 1, -1, -1],
          ].map(([x, y, sx, sy], i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                [x ? 'right' : 'left']: 0,
                [y ? 'bottom' : 'top']: 0,
                width: 28,
                height: 28,
                borderTop: y ? 'none' : `2px solid ${pal.accent}`,
                borderBottom: y ? `2px solid ${pal.accent}` : 'none',
                borderLeft: x ? 'none' : `2px solid ${pal.accent}`,
                borderRight: x ? `2px solid ${pal.accent}` : 'none',
                borderTopLeftRadius: !x && !y ? 8 : 0,
                borderTopRightRadius: x && !y ? 8 : 0,
                borderBottomLeftRadius: !x && y ? 8 : 0,
                borderBottomRightRadius: x && y ? 8 : 0,
              }}
            />
          ))}
          {/* Scan line */}
          {scanning && (
            <div
              style={{
                position: 'absolute',
                left: 8,
                right: 8,
                height: 2,
                top: 0,
                background: `linear-gradient(90deg, transparent, ${pal.accent}, transparent)`,
                boxShadow: `0 0 18px ${pal.accent}`,
                animation: 'sab-scan 1.8s ease-in-out infinite',
              }}
            />
          )}
        </div>
      )}

      {/* Hint */}
      {!matched && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            marginTop: 200,
            textAlign: 'center',
            color: 'rgba(255,255,255,0.85)',
            fontSize: 12.5,
            letterSpacing: '0.04em',
            fontWeight: 500,
            zIndex: 2,
          }}
        >
          {scanning ? 'Scanning label…' : 'Center the bottle or tap handle'}
        </div>
      )}

      {/* AI match sheet */}
      <div
        style={{
          position: 'absolute',
          left: 12,
          right: 12,
          bottom: matched ? 16 : -400,
          transition: 'bottom 0.55s cubic-bezier(0.16,1,0.3,1)',
          zIndex: 4,
        }}
      >
        <div
          style={{
            padding: 18,
            borderRadius: 24,
            background: 'rgba(20,18,14,0.7)',
            WebkitBackdropFilter: 'blur(28px) saturate(160%)',
            backdropFilter: 'blur(28px) saturate(160%)',
            border: '0.5px solid rgba(255,255,255,0.14)',
            boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset, 0 20px 60px rgba(0,0,0,0.6)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 14,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: pal.accent,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: pal.accent,
                  boxShadow: `0 0 8px ${pal.accent}`,
                }}
              />
              AI Match
            </div>
            <div
              style={{
                color: 'rgba(255,255,255,0.55)',
                fontSize: 11,
                fontWeight: 600,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              97% confidence
            </div>
          </div>

          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 16 }}>
            <div
              style={{
                width: 72,
                height: 92,
                flexShrink: 0,
                position: 'relative',
                borderRadius: 8,
                overflow: 'hidden',
                background: 'linear-gradient(180deg, #2a1f10 0%, #1a120a 100%)',
                border: '0.5px solid rgba(255,255,255,0.1)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: '6px 8px',
                  borderRadius: 4,
                  background: 'linear-gradient(180deg, #F4C24A 0%, #C97A36 100%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: '24px 12px 30px',
                  borderRadius: 2,
                  background: pal.cream,
                  color: '#3a2810',
                  fontSize: 7,
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '"Instrument Serif", serif',
                  fontStyle: 'italic',
                }}
              >
                OH
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.1,
                }}
              >
                Green Diamonds
              </div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 3 }}>
                Other Half Brewing
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                {['DIPA', 'Hazy', '8.5%'].map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: '3px 8px',
                      borderRadius: 999,
                      fontSize: 10.5,
                      fontWeight: 600,
                      background: 'rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.85)',
                      border: '0.5px solid rgba(255,255,255,0.1)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => {
                setMatched(false);
                setScanning(true);
                setTimeout(() => {
                  setScanning(false);
                  setMatched(true);
                }, 2000);
              }}
              style={{
                flex: 1,
                height: 50,
                borderRadius: 14,
                border: '0.5px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.06)',
                color: '#fff',
                fontWeight: 600,
                fontSize: 13.5,
              }}
            >
              Not this one
            </button>
            <button
              onClick={onConfirm}
              style={{
                flex: 2,
                height: 50,
                borderRadius: 14,
                border: 'none',
                background: `linear-gradient(180deg, ${pal.accent2} 0%, ${pal.accent} 100%)`,
                color: '#000',
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: '0.01em',
                boxShadow: `0 8px 22px ${pal.accent}55`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              {Icons.check} Confirm & Log
            </button>
          </div>
        </div>
      </div>

      <style>{`@keyframes sab-scan {
        0% { top: 0; opacity: 0; } 10% { opacity: 1; }
        50% { top: calc(100% - 2px); opacity: 1; } 60% { opacity: 0; }
        100% { top: 0; opacity: 0; }
      }`}</style>
    </div>
  );
}

// ─── Session screen ──────────────────────────────────────────────────────────
function Session({ pal }) {
  const [seconds, setSeconds] = u2S(2 * 3600 + 14 * 60 + 32);
  const [beers, setBeers] = u2S(3);
  const [paused, setPaused] = u2S(false);
  u2E(() => {
    if (paused) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [paused]);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div style={{ padding: '8px 22px 28px', minHeight: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 0 18px',
        }}
      >
        <div>
          <div
            style={{
              color: pal.accent,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: pal.accent,
                boxShadow: `0 0 10px ${pal.accent}`,
                animation: 'sab-pulse 1.6s ease-in-out infinite',
              }}
            />
            Live session
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 4 }}>
            Started 7:26 PM · Mission District
          </div>
        </div>
        <button
          onClick={() => setPaused((p) => !p)}
          style={{
            width: 38,
            height: 38,
            borderRadius: 999,
            background: 'rgba(255,255,255,0.06)',
            border: '0.5px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {paused ? Icons.bolt : Icons.pause}
        </button>
      </div>

      {/* Timer */}
      <div style={{ textAlign: 'center', padding: '24px 0 32px' }}>
        <div
          style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: 10.5,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Duration
        </div>
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 200,
            fontSize: 76,
            lineHeight: 1,
            color: '#fff',
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '-0.04em',
          }}
        >
          {h}:{pad(m)}
          <span style={{ color: pal.accent }}>:{pad(s)}</span>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
        <div
          style={{
            padding: 18,
            borderRadius: 20,
            border: '0.5px solid rgba(255,255,255,0.07)',
            background: 'rgba(255,255,255,0.025)',
          }}
        >
          <div
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 10.5,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Beers
          </div>
          <div
            style={{
              color: '#fff',
              fontSize: 40,
              fontWeight: 200,
              marginTop: 6,
              fontFamily: 'Inter, sans-serif',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            {beers}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 6 }}>
            ≈ 24.4 ABV·oz
          </div>
        </div>
        <div
          style={{
            padding: 18,
            borderRadius: 20,
            border: '0.5px solid rgba(255,255,255,0.07)',
            background: 'rgba(255,255,255,0.025)',
          }}
        >
          <div
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 10.5,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Pace
          </div>
          <div
            style={{
              color: '#fff',
              fontSize: 40,
              fontWeight: 200,
              marginTop: 6,
              fontFamily: 'Inter, sans-serif',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            44'
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 6 }}>per beer</div>
        </div>
      </div>

      {/* Friends */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
        >
          <div
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 10.5,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Tagged
          </div>
          <button
            style={{
              background: 'none',
              border: 0,
              color: pal.accent,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            + Add
          </button>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {FRIENDS.map((f, i) => (
            <div key={i} style={{ flexShrink: 0, textAlign: 'center', width: 52 }}>
              <Avatar user={{ avatar: f.name[0], avatarTone: f.tone }} size={48} />
              <div
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: 10.5,
                  marginTop: 6,
                  fontWeight: 500,
                }}
              >
                {f.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent log */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 10.5,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          Tonight's pours
        </div>
        {[
          { name: 'Pliny the Elder', brewery: 'Russian River', when: '24m ago', abv: 8.0 },
          { name: 'Ratbeer Lite', brewery: 'Cellarmaker', when: '1h ago', abv: 4.8 },
          { name: 'West Coast IPA', brewery: 'Green Cheek', when: '1h 48m ago', abv: 7.2 },
        ].map((b, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 0',
              borderBottom: i < 2 ? '0.5px solid rgba(255,255,255,0.05)' : 'none',
            }}
          >
            <div
              style={{
                width: 32,
                height: 40,
                borderRadius: 4,
                flexShrink: 0,
                background: `linear-gradient(180deg, ${pal.accent2} 0%, #6B4A1C 100%)`,
                border: '0.5px solid rgba(255,255,255,0.1)',
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: '#fff', fontSize: 13.5, fontWeight: 600 }}>{b.name}</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11.5 }}>
                {b.brewery} · {b.abv}% · {b.when}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 6 }}>
        <button
          onClick={() => setBeers((b) => b + 1)}
          style={{
            height: 60,
            borderRadius: 18,
            border: 'none',
            background: `linear-gradient(180deg, ${pal.accent2} 0%, ${pal.accent} 100%)`,
            color: '#000',
            fontWeight: 700,
            fontSize: 15.5,
            letterSpacing: '0.01em',
            boxShadow: `0 10px 28px ${pal.accent}40`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          {Icons.plus} Log another beer
        </button>
        <button
          style={{
            height: 52,
            borderRadius: 18,
            border: '0.5px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.04)',
            color: '#fff',
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          End & publish session
        </button>
      </div>

      <style>{`@keyframes sab-pulse {
        0%,100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.3); }
      }`}</style>
    </div>
  );
}

// ─── Profile screen ──────────────────────────────────────────────────────────
function Profile({ pal }) {
  return (
    <div style={{ paddingBottom: 28 }}>
      {/* Header */}
      <div style={{ position: 'relative', padding: '24px 22px 18px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 22,
          }}
        >
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500 }}>
            @yourhandle
          </div>
          <button style={{ background: 'none', border: 0, color: 'rgba(255,255,255,0.7)' }}>
            {Icons.gear}
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative' }}>
            <Avatar user={{ avatar: 'J', avatarTone: 40 }} size={72} ring={pal.accent} />
            <div
              style={{
                position: 'absolute',
                bottom: -2,
                right: -2,
                background: pal.accent,
                color: '#000',
                borderRadius: 999,
                padding: '2px 7px',
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '0.04em',
                border: '2px solid #000',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              L 12
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                color: '#fff',
                fontSize: 22,
                fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '-0.02em',
              }}
            >
              Jordan Avery
            </div>
            <div
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: 12.5,
                marginTop: 3,
                textWrap: 'pretty',
              }}
            >
              Pale ales over IPAs. Belgian sceptic.
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          margin: '0 14px',
          borderRadius: 18,
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.06)',
        }}
      >
        {[
          { v: '284', l: 'Beers' },
          { v: '47', l: 'Styles' },
          { v: '63', l: 'Breweries' },
          { v: '12', l: 'Countries' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#0A0806', padding: '14px 0', textAlign: 'center' }}>
            <div
              style={{
                color: '#fff',
                fontSize: 22,
                fontWeight: 300,
                fontFamily: 'Inter, sans-serif',
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.03em',
              }}
            >
              {s.v}
            </div>
            <div
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: 10,
                marginTop: 4,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              {s.l}
            </div>
          </div>
        ))}
      </div>

      {/* Weekly recap */}
      <div style={{ padding: '24px 22px 8px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
        >
          <div style={{ color: '#fff', fontSize: 14.5, fontWeight: 600 }}>Weekly Recap</div>
          <button
            style={{
              background: 'none',
              border: 0,
              color: pal.accent,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            See all
          </button>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          gap: 12,
          overflowX: 'auto',
          padding: '0 22px 4px',
          scrollbarWidth: 'none',
        }}
      >
        {[
          { week: 'Apr 14 – 20', beers: 7, styles: 4, hue: 45, top: 'Hazy IPA' },
          { week: 'Apr 7 – 13', beers: 5, styles: 3, hue: 90, top: 'Pilsner' },
          { week: 'Mar 31 – 6', beers: 9, styles: 6, hue: 200, top: 'Saison' },
        ].map((w, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: 220,
              padding: 16,
              borderRadius: 20,
              border: '0.5px solid rgba(255,255,255,0.08)',
              background: `radial-gradient(120% 80% at 100% 0%, oklch(0.7 0.14 ${w.hue} / 0.18) 0%, transparent 60%),
                         linear-gradient(180deg, #14110B 0%, #0A0806 100%)`,
            }}
          >
            <div
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: 10.5,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              {w.week}
            </div>
            <div
              style={{
                color: '#fff',
                fontSize: 34,
                fontWeight: 200,
                marginTop: 10,
                fontFamily: 'Inter, sans-serif',
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              {w.beers}{' '}
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                beers
              </span>
            </div>
            <div
              style={{ display: 'flex', gap: 4, marginTop: 14, alignItems: 'flex-end', height: 28 }}
            >
              {[3, 5, 2, 7, 4, 6, 3].map((v, j) => (
                <div
                  key={j}
                  style={{
                    flex: 1,
                    height: `${v * 12}%`,
                    borderRadius: 2,
                    background: j === 3 ? pal.accent : 'rgba(255,255,255,0.18)',
                  }}
                />
              ))}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11.5, marginTop: 12 }}>
              Most: <span style={{ color: '#fff', fontWeight: 600 }}>{w.top}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Trophy case */}
      <div style={{ padding: '28px 22px 8px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 14,
          }}
        >
          <div style={{ color: '#fff', fontSize: 14.5, fontWeight: 600 }}>Trophy Case</div>
          <span
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: 11.5,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            6 of 32
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {TROPHIES.map((t) => (
            <div
              key={t.id}
              style={{
                padding: '16px 8px 12px',
                borderRadius: 16,
                background: 'rgba(255,255,255,0.025)',
                border: '0.5px solid rgba(255,255,255,0.06)',
                textAlign: 'center',
              }}
            >
              {/* Foil-gradient crest */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  margin: '0 auto',
                  position: 'relative',
                  clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
                  background: `conic-gradient(from 200deg at 50% 50%,
                  oklch(0.85 0.14 ${t.hue}) 0deg,
                  oklch(0.55 0.16 ${t.hue}) 90deg,
                  oklch(0.92 0.10 ${t.hue + 20}) 180deg,
                  oklch(0.45 0.18 ${t.hue - 10}) 270deg,
                  oklch(0.85 0.14 ${t.hue}) 360deg)`,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 4,
                    clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
                    background: `linear-gradient(160deg,
                    oklch(0.95 0.08 ${t.hue}) 0%,
                    oklch(0.55 0.18 ${t.hue}) 50%,
                    oklch(0.35 0.14 ${t.hue}) 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(0,0,0,0.65)',
                    fontWeight: 800,
                    fontSize: 18,
                    fontFamily: '"Instrument Serif", serif',
                    fontStyle: 'italic',
                  }}
                >
                  {t.label[0]}
                </div>
              </div>
              <div
                style={{
                  color: '#fff',
                  fontSize: 11.5,
                  fontWeight: 600,
                  marginTop: 10,
                  lineHeight: 1.2,
                }}
              >
                {t.label}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, marginTop: 2 }}>
                {t.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.SAB.Screens.Camera = Camera;
window.SAB.Screens.Session = Session;
window.SAB.Screens.Profile = Profile;
