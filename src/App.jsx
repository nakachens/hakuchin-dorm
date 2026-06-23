import { useEffect, useRef, useState } from 'react';
import LoadLord, { useLoadLord } from './assets/LoadLord';
import Monta from './friends/Monta';
import Miru from './friends/Miru';
import Dore from './friends/Dore';
import Kira from './friends/Kira';
import Ryucchi from './friends/Ryucchi';
import Ren from './friends/Ren';
//size of app
const BASE_W = 1920;
const BASE_H = 1080;
//panel pages
const PAGES = [
  '/animations/bg/panel/page1.gif',
  '/animations/bg/panel/page2.gif',
  '/animations/bg/panel/page3.gif',
];

function App() {
  const { loaded, total, done: assetsReady } = useLoadLord();

  const [scale, setScale] = useState(1);
  const [muted, setMuted] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [page, setPage] = useState(0);
  const audioRef = useRef(null);
  const clickRef = useRef(null);

  //click sound effect
  const playClick = () => {
    if (audioRef.current?.muted) return;
    const sfx = clickRef.current;
    if (!sfx) return;
    sfx.currentTime = 0;
    sfx.play().catch(() => {});
  };

  useEffect(() => {
    const resize = () => {
      setScale(Math.min(window.innerWidth / BASE_W, window.innerHeight / BASE_H));
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = 1;
    audio.play().catch(() => {
      const unlock = () => {
        audio.play();
        window.removeEventListener('pointerdown', unlock);
      };
      window.addEventListener('pointerdown',unlock);
    });
  }, []);

  const toggleMute = () =>{
    const audio= audioRef.current;
    if (!audio) return;
    if (audio.muted){
      // unmiting
      audio.muted =false;
      setMuted(false);
      playClick();
    } else {
      // muting 
      playClick();
      audio.muted=true;
      setMuted(true);
    }
  };

  const openPanel=()=>{
    playClick();
    setPage(0);
    setPanelOpen(true);
  };

  const closePanel =() =>{
    playClick();
    setPanelOpen(false);
  };

  return (
    <>
    {!assetsReady && <LoadLord loaded={loaded} total={total} />}
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#403f3f',
      visibility: assetsReady ? 'visible' : 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <audio ref={audioRef} src="/music/Strawberry.mp3" />
      <audio ref={clickRef} src="/music/click.mp3" />

      <div style={{
        width:BASE_W,
        height: BASE_H,
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        position: 'relative',
        overflow:'hidden',
        flexShrink:0,
      }}>
        {/*bg doodles*/}
        <img
          src="/animations/bg/doodles.gif"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'1px solid #fff' }}
          alt=""
        />

        {/*all charavters*/}
        <Monta scale={scale}/>
        <Miru scale={scale}/>
        <Dore scale={scale} />
        <Ren scale={scale}/>
        <Kira/>
        <Ryucchi/>

        {/*downside buttons!!*/}
        <div style={{
          position: 'absolute',
          bottom: 32,
          left: 32,
          display: 'flex',
          gap: 16,
          zIndex: 100,
        }}>
          {/*mute/unmute*/}
          <button
            onClick={toggleMute}
            style={{ width:100, height:100, padding:0, background:'none',border:'none', cursor:'pointer' }}
          >
            <img
              src={muted ? '/unmute.gif' : '/mute.gif'}
              alt={muted ? 'unmute' : 'mute'}
              style={{ width:'100%', height:'100%', objectFit:'contain'  }}
            />
          </button>

          {/*dev notes btn */}
          <button
            onClick={openPanel}
            style={{ width: 100, height: 100, padding: 0, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <img
              src="/read.gif"
              alt="Read"
              style={{ width:'100%',height: '100%',objectFit:'contain'}}
            />
          </button>
        </div>

        {/*panel bg shaodow*/}
        {panelOpen && (
          <div
            onClick={closePanel}
            style={{
              position:'absolute',
              inset:0,
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              zIndex:200,
              background: 'rgba(48, 29, 15, 0.25)',
            }}
          >
            {/*panel content*/}
            <div
              onClick={e => e.stopPropagation()}
              style={{
                position: 'relative',
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/*page art*/}
              <img
                src={PAGES[page]}
                alt={`Page ${page +1}`}
                style={{ display: 'block', height: 'auto', width: 920 }}
              />

              {/*nav panel btns*/}
              <div style={{
                position:'absolute',
                bottom:206,
                left:156,
                display: 'flex',
                gap: 12,
                opacity:'50%',
              }}>
                {/*back btn on page 2*/}
                {page ===1 &&(
                  <button
                    onClick={() =>{ playClick(); setPage(p => p - 1); }}
                    style={{ width:100, height:100, padding:0, background:'none', border:'none', cursor:'pointer'}}
                    aria-label="Previous page"
                  >
                    <img src="/back.gif" alt="Back" style={{ width:'100%', height:'100%', objectFit:'contain'}}/>
                  </button>
                )}

                {/* next btns on page 1,2*/}
                {page< PAGES.length-1 && (
                  <button
                    onClick={()=>{playClick(); setPage(p=> p+1); }}
                    style={{width:100, height:100, padding:0, background:'none', border:'none', cursor:'pointer' }}
                    aria-label="Next page"
                  >
                    <img src="/next.gif" alt="Next" style={{ width:'100%', height:'100%', objectFit:'contain'}}/>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default App;